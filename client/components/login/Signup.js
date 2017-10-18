import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import { updateUsername } from '../../redux/actions/userActions';

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
        // do something once successfully signed up
        const authDetails = new AuthenticationDetails({
          Username: this.state.usernameInput,
          Password: this.state.passwordInput,
        });
        const cognitoUser = new CognitoUser({
          Username: this.state.usernameInput,
          Pool: userPool,
        });
        cognitoUser.authenticateUser(authDetails, {
          onFailure: (err) => {
            alert(err);
          },
          onSuccess: (results) => {
            // get session token from results and attach to aws config
            // only if needing to access other aws services
            // or store in async storage or redux?
            this.props.updateUsername(this.state.usernameInput);
            // do something when logged in
          },
        });
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

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsername: (username) => {
      dispatch(updateUsername(username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
