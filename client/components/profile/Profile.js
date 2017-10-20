import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {
  AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_CLIENT_ID,
} from 'react-native-dotenv';
import {
  CognitoUserPool,
} from 'react-native-aws-cognito-js';

import { resetUser } from '../../redux/actions/userActions';
import { resetHouse } from '../../redux/actions/houseActions';

const awsCognitoSettings = {
  UserPoolId: AWS_COGNITO_USER_POOL_ID,
  ClientId: AWS_COGNITO_CLIENT_ID,
};

class Profile extends Component {
  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    console.log('Logging out');
    // TODO
    // remove house info from redux and asyncstore
    AsyncStorage.multiRemove(['username', 'houseId'])
      .then(() => {
        const userPool = new CognitoUserPool(awsCognitoSettings);
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
          // only able to call signOut if logging out from the same session
          // that you were in when signing in
          cognitoUser.signOut();
        }
        this.props.resetHouse();
        this.props.resetUser();
      })
      .catch((err) => {
        // handle error for removing from asyncstore
      });
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <TouchableOpacity onPress={this.handleLogout}>
          <View>
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetUser: () => {
      dispatch(resetUser());
    },
    resetHouse: () => {
      dispatch(resetHouse());
    },
  };
};

export default connect(null, mapDispatchToProps)(Profile);
