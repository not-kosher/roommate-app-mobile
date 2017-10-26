import { AsyncStorage } from 'react-native';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoIdToken,
  CognitoUserSession,
} from 'react-native-aws-cognito-js';
import {
  AWS_COGNITO_IDENTITY_POOL_ID,
  AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_CLIENT_ID,
  AWS_PROJECT_REGION,
} from 'react-native-dotenv';

import AWS from './awsConfig';
import axios from '../lib/customAxios';


const awsCognitoSettings = {
  UserPoolId: AWS_COGNITO_USER_POOL_ID,
  ClientId: AWS_COGNITO_CLIENT_ID,
};
const userPool = new CognitoUserPool(awsCognitoSettings);

const createCredentials = (session) => {
  const loginProp = `cognito-idp.${AWS_PROJECT_REGION}.amazonaws.com/${AWS_COGNITO_USER_POOL_ID}`;
  return new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID,
    Logins: {
      [loginProp]: session.getIdToken().getJwtToken(),
    },
  });
};

const storeSession = (session, cb) => {
  AsyncStorage.multiSet([['cognitoSession', JSON.stringify(session)], ['loggedIn', JSON.stringify(true)]])
    .then((result) => {
      if (cb) cb(result);
    })
    .catch(err => console.log('Error setting credentials in async', err));
};

const storeCredentials = (creds) => {
  AWS.config.credentials = creds;
  AWS.config.credentials.get((err) => {
    if (err) {
      console.log('Error getting creds...', err);
    } else {
      const { accessKeyId, secretAccessKey, sessionToken } = AWS.config.credentials;
      const awsCredentials = {
        accessKeyId,
        secretAccessKey,
        sessionToken,
      };
      AsyncStorage.setItem('awsCredentials', JSON.stringify(awsCredentials));
    }
  });
};

export const login = (username, password, cb) => {
  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });
  cognitoUser.authenticateUser(authDetails, {
    onFailure: error => console.log('Error authenticating', error),
    onSuccess: (result) => {
      storeSession(result);
      const creds = createCredentials(result);
      storeCredentials(creds);
      // cb for redux actions
      if (cb) cb(result);
    },
  });
};

export const signup = (username, password, cb) => {
  userPool.signUp(username, password, null, null, (error, result) => {
    if (error) {
      console.log('Error signing up', error);
    } else {
      // create user in db
      axios.post('/api/users/addUser', { username })
        // cb for redux actions
        .then(res => login(username, password, cb))
        .catch(err => console.log('Error creating user', err));
    }
  });
};


const getEmail = (user, cb) => {
  user.getUserAttributes((error, results) => {
    if (error) {
      console.log('Error retrieving attributes', error);
    } else {
      let email;
      results.forEach((attr) => {
        if (attr.getName() === 'email') {
          email = attr.getValue();
        }
      });
      if (cb) cb(email);
    }
  });
};

const getCurrentUser = (cb) => {
  userPool.storage.sync((err) => {
    if (err) {
      console.log('Error syncing user pool', err);
    } else {
      const user = userPool.getCurrentUser();
      if (user) cb(user);
      else console.log('Error retrieving user.');
    }
  });
};

export const reAuthUser = (cb) => {
  // create new authed user with session tokens from storage
  // call cb with email pulled from user
  AsyncStorage.getItem('loggedIn')
    .then((loggedIn) => {
      if (JSON.parse(loggedIn)) {
        getCurrentUser((user) => {
          user.getSession((err, session) => {
            if (err) {
              console.log('Error getting session', err);
            } else if (session && session.isValid()) {
              storeSession(session);
              const creds = createCredentials(session);
              storeCredentials(creds);
              getEmail(user, cb);
            }
          });
        });
      }
    })
    .catch(err => console.log('Error retrieving logged in status', err));
};

const createNewSession = (session) => {
  return new CognitoUserSession({
    IdToken: new CognitoIdToken({ IdToken: session.idToken.jwtToken }),
    RefreshToken: new CognitoIdToken({ IdToken: session.refreshToken.token }),
    AccessToken: new CognitoIdToken({ IdToken: session.accessToken.jwtToken }),
  });
};

export const logout = (cb) => {
  AsyncStorage.getItem('cognitoSession')
    .then((result) => {
      const session = createNewSession(JSON.parse(result));
      const creds = createCredentials(session);
      creds.clearCachedId();
      AWS.config.credentials = creds;
      getCurrentUser(user => user.signOut());
      return AsyncStorage.multiRemove(['awsCredentials', 'cognitoSession']);
    })
    .then(() => AsyncStorage.setItem('loggedIn', JSON.stringify(false)))
    .then(cb)
    .catch(err => console.log('Error with async in logout', err));
};
