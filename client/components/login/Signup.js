import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {
  FormInput,
  FormLabel,
  FormValidationMessage,
} from 'react-native-elements';
import { MaterialIndicator } from 'react-native-indicators';

import * as auth from '../../lib/authHelper';
import form from '../../lib/formValidation';
import { retrieveUser } from '../../redux/actions/userActions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      validEmail: true,
      passwordInput: '',
      passwordErrors: [],
      isSigningUp: false,
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  handleSignup() {
    if (this.state.validEmail && !this.state.passwordErrors.length) {
      this.setState({ isSigningUp: true });

      auth.signup(this.state.usernameInput, this.state.passwordInput, () => {
        this.props.retrieveUser(this.state.usernameInput, () => {
          this.setState({ isSigningUp: false });
        });
      });
    }
  }

  updateUsername(usernameInput) {
    this.setState({
      usernameInput,
      validEmail: form.isValidEmail(usernameInput),
    });
  }

  updatePassword(passwordInput) {
    const passwordErrors = form.getPasswordErrors(this.state.passwordInput);
    this.setState({
      passwordInput,
      passwordErrors,
    });
  }

  render() {
    if (!this.state.isSigningUp) {
      return (
        <View>
          <TextInput
            placeholder="Username"
            onChangeText={this.updateUsername}
            value={this.state.usernameInput}
          />
          <TextInput
            placeholder="Password"
            onChangeText={this.updatePassword}
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
