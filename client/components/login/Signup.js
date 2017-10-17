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
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('Help me', this.state.username, this.state.password);
    const userPool = new CognitoUserPool(awsCognitoSettings);
    userPool.signUp(this.state.username, this.state.password, null, null, (err, results) => {
      if (err) {
        console.log('ya dun fudged up', err);
      } else {
        console.log('The user is', results.user);
      }
    });
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
        <TouchableOpacity onPress={this.handleSubmit}>
          <View>
            <Text>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Signup;
