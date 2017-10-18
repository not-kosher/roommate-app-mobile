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

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
    };

    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup() {
    const userPool = new CognitoUserPool(awsCognitoSettings);
    userPool.signUp(this.state.usernameInput, this.state.passwordInput, null, null, (err, results) => {
      if (err) {
        alert(err);
      } else {
        console.log('The user is', results.user);
      }
    });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Username"
          onChangeText={usernameInput => this.setState({ usernameInput })}
          value={this.state.usernameInput}
        />
        <TextInput
          placeholder="Password"
          onChangeText={passwordInput => this.setState({ passwordInput })}
          value={this.state.passwordInput}
        />
        <TouchableOpacity onPress={this.handleSignup}>
          <View>
            <Text>Sign Up</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <View>
            <Text>or Log in as existing user</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Signup;
