import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {
  AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_CLIENT_ID,
} from 'react-native-dotenv';

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'react-native-aws-cognito-js';

const awsCognitoSettings = {
  UserPoolId: AWS_COGNITO_USER_POOL_ID,
  ClientId: AWS_COGNITO_CLIENT_ID,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    console.log('Logging in');
    const userPool = new CognitoUserPool(awsCognitoSettings);
    const authDetails = new AuthenticationDetails({
      Username: this.state.username,
      Password: this.state.password,
    });
    const cognitoUser = new CognitoUser({
      Username: this.state.username,
      Pool: userPool,
    });
    cognitoUser.authenticateUser(authDetails, {
      onFailure: (err) => {
        alert(err);
      },
      onSuccess: (results) => {
        // generate session token with results and attach to aws config
        // only if needing to access other aws services
        console.log('You logged in successfully', results.user);
      },
    });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity onPress={this.handleLogin}>
          <View>
            <Text>Log In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
          <View>
            <Text>or Sign in as a new user</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;
