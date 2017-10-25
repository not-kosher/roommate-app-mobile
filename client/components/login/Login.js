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

import * as auth from '../../lib/authHelper';
import { retrieveUser } from '../../redux/actions/userActions';
import { getHouse, getRoomies } from '../../redux/actions/houseActions';

const awsCognitoSettings = {
  UserPoolId: AWS_COGNITO_USER_POOL_ID,
  ClientId: AWS_COGNITO_CLIENT_ID,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    auth.login(this.state.usernameInput, this.state.passwordInput, () => {
      this.props.retrieveUser(this.state.usernameInput, ({ houseId }) => {
        if (houseId) {
          this.props.getHouse(houseId);
          this.props.getRoomies(houseId);
        }
      });
    });
    // const userPool = new CognitoUserPool(awsCognitoSettings);
    // const authDetails = new AuthenticationDetails({
    //   Username: this.state.usernameInput,
    //   Password: this.state.passwordInput,
    // });
    // const cognitoUser = new CognitoUser({
    //   Username: this.state.usernameInput,
    //   Pool: userPool,
    // });
    // cognitoUser.authenticateUser(authDetails, {
    //   onFailure: (failure) => {
    //     console.log('Error authenticating', failure);
    //     alert('There was an error logging in.');
    //   },
    //   onSuccess: (success) => {
    //     // add username to async store
    //     AsyncStorage.setItem('username', this.state.usernameInput)
    //       .then(() => {
    //         // grab user information and update redux with it
    //         this.props.retrieveUser(this.state.usernameInput, (houseId) => {
    //           if (houseId) {
    //             this.props.getHouse(houseId);
    //             this.props.getRoomies(houseId);
    //             AsyncStorage.setItem('houseId', `${houseId}`);
    //           }
    //         });
    //       })
    //       .catch((asyncErr) => {
    //         console.log('Async store error', asyncErr);
    //         alert('There was an error while logging in.');
    //       });
    //   },
    // });
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
        <TouchableOpacity onPress={this.handleLogin}>
          <View>
            <Text>Log In</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
          <View>
            <Text>or Sign in as a new user</Text>
          </View>
        </TouchableOpacity> */}
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
    retrieveUser: (username, cb) => {
      dispatch(retrieveUser(username, cb));
    },
    getHouse: (houseId) => {
      dispatch(getHouse(houseId));
    },
    getRoomies: (houseId) => {
      dispatch(getRoomies(houseId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
