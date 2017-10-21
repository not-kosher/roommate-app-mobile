import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  AsyncStorage,
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
import axios from '../../lib/customAxios';

import { retrieveUser } from '../../redux/actions/userActions';

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
        // create user in db
        axios.post('/api/users/addUser', {
          username: this.state.usernameInput,
        })
          .then((result) => {
            // log in new user
            const authDetails = new AuthenticationDetails({
              Username: this.state.usernameInput,
              Password: this.state.passwordInput,
            });
            const cognitoUser = new CognitoUser({
              Username: this.state.usernameInput,
              Pool: userPool,
            });
            cognitoUser.authenticateUser(authDetails, {
              onFailure: (failure) => {
                console.log('Error authenticating', failure);
                alert('There was an error logging in.');
              },
              onSuccess: (success) => {
                // add username to async store
                AsyncStorage.setItem('username', this.state.usernameInput)
                  .then(() => {
                    // grab user information and update redux with it
                    this.props.retrieveUser(this.state.usernameInput);
                  })
                  .catch((asyncErr) => {
                    console.log('Async store error', asyncErr);
                    alert('There was an error while logging in.');
                  });
              },
            });
          })
          .catch((error) => {
            console.log('Error creating user', error);
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
    retrieveUser: (username) => {
      dispatch(retrieveUser(username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
