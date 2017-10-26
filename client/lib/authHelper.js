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
  AsyncStorage.setItem('cognitoSession', JSON.stringify(session))
    .then((result) => {
      if (cb) cb(result);
    })
    .catch(err => console.log('Error setting credentials in async', err));
};

const setCredentials = (creds) => {
  AWS.config.credentials = creds;
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
      setCredentials(creds);
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

const createNewSession = (session) => {
  return new CognitoUserSession({
    IdToken: new CognitoIdToken({ IdToken: session.idToken.jwtToken }),
    RefreshToken: new CognitoIdToken({ IdToken: session.refreshToken.token }),
    AccessToken: new CognitoIdToken({ IdToken: session.accessToken.jwtToken }),
  });
};

const getSession = (cb) => {
  // connect to async store and retrieve credentials
  // call cb with the credentials generated from stored creds
  AsyncStorage.getItem('cognitoSession')
    .then((result) => {
      const newSession = createNewSession(JSON.parse(result));
      cb(newSession);
    })
    .catch(err => console.log('Error retrieving credentials from async', err));
};

export const reAuthUser = (cb) => {
  // create user pool
  // user pool storage sync
  // create user pool
  // gets current user
  // current user get session
  // sets session to async store (and isloggedin flag true)
  // if no current user (line 315):
  // sets aws creds to aws config creds and async
  // set isloggedin to false on async

  userPool.storage.sync((err, success) => {
    if (err) {
      console.log('Error syncing', err);
    } else {
      const user = userPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            console.log('Error getting session', err);
          } else {
            storeSession(session);
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
          }
        });
      }
    }
  });
};

export const logout = () => {

};
