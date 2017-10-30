import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
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
      validEmail: false,
      passwordInput: '',
      passwordErrors: [
        form.errors.length,
        form.errors.lowerCase,
        form.errors.upperCase,
        form.errors.number,
      ],
      validPassword: false,
      isSigningUp: false,
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  handleSignup() {
    if (this.state.validEmail && this.state.validPassword) {
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
    const passwordErrors = form.getPasswordErrors(passwordInput);
    const validPassword = !passwordErrors.length;
    this.setState({
      passwordInput,
      passwordErrors,
      validPassword,
    });
  }

  render() {
    if (!this.state.isSigningUp) {
      return (
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="Enter your email"
            onChangeText={this.updateUsername}
            value={this.state.usernameInput}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {!this.state.validEmail &&
            <FormValidationMessage>
              Not a valid email address.
            </FormValidationMessage>
          }
          <FormLabel>Password</FormLabel>
          <FormInput
            placeholder="Enter a password"
            onChangeText={this.updatePassword}
            value={this.state.passwordInput}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          {!this.state.validPassword &&
            <FormValidationMessage>
              {`${this.state.passwordErrors.join('\n')}`}
            </FormValidationMessage>
          }
          <TouchableOpacity
            onPress={this.handleSignup}
            disabled={!(this.state.usernameInput && this.state.passwordInput)}
          >
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
