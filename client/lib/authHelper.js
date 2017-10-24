import { AsyncStorage } from 'react-native';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
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

const storeCredentials = (creds, cb) => {
  AsyncStorage.setItem('awsCredentials', JSON.stringify(creds))
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
      // check what is on session result to see if also needs storing?
      const creds = createCredentials(result);
      setCredentials(creds);
      storeCredentials(creds);
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
        .then(res => login(username, password, cb))
        .catch(err => console.log('Error creating user', err));
    }
  });
};

export const reAuthUser = () => {

};

export const logout = () => {

};
