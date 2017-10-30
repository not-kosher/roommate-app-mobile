import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

import * as auth from '../../lib/authHelper';
import isValidPassword from '../../lib/formValidation';
import { retrieveUser } from '../../redux/actions/userActions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
      isSigningUp: false,
    };

    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup() {
    if (isValidPassword(this.state.passwordInput)) {
      this.setState({ isSigningUp: true });

      auth.signup(this.state.usernameInput, this.state.passwordInput, () => {
        this.props.retrieveUser(this.state.usernameInput, () => {
          this.setState({ isSigningUp: false });
        });
      });
    }
  }

  render() {
    if (!this.state.isSigningUp) {
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
        </View>
      );
    }

    return <MaterialIndicator />;
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
