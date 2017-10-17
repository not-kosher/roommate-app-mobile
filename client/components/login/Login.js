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
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="username"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          placeholder="password"
          onChangeText={password => this.setState({ password })}
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
