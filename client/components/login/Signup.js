import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Alert,
} from 'react-native';
import {
  FormInput,
  FormLabel,
  FormValidationMessage,
  Button,
} from 'react-native-elements';
import { MaterialIndicator } from 'react-native-indicators';

import * as auth from '../../lib/authHelper';
import form from '../../lib/formValidation';
import * as color from '../../styles/common';
import { retrieveUser } from '../../redux/actions/userActions';

const styles = {
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    marginTop: 40,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonDisabled: {
    backgroundColor: '#c3e0dc',
  },
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
      passwordErrors: [
        form.passwordErrors.length,
        form.passwordErrors.lowerCase,
        form.passwordErrors.upperCase,
        form.passwordErrors.number,
      ],
      validPassword: false,
      showRequirements: false,
      isSigningUp: false,
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  handleSignup() {
    const validEmail = form.isValidEmail(this.state.usernameInput);
    if (validEmail && this.state.validPassword) {
      this.setState({ isSigningUp: true });

      auth.signup(this.state.usernameInput, this.state.passwordInput, (err) => {
        if (err) {
          Alert.alert('Error', form.parseError(err));
          this.setState({ isSigningUp: false });
          return;
        }
        this.props.retrieveUser(this.state.usernameInput, () => {
          this.setState({ isSigningUp: false });
        });
      });
    } else if (!validEmail) {
      Alert.alert('Error', 'Please make sure your email address is valid.');
    } else if (!this.state.validPassword) {
      Alert.alert('Error', 'Please make sure your password is valid.');
    }
  }

  updateUsername(usernameInput) {
    this.setState({
      usernameInput,
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
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <FormLabel>Email</FormLabel>
            <FormInput
              placeholder="Enter your email"
              onChangeText={this.updateUsername}
              value={this.state.usernameInput}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              placeholder="Enter a password"
              onChangeText={this.updatePassword}
              onFocus={() => this.setState({ showRequirements: true })}
              value={this.state.passwordInput}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
              selectTextOnFocus
            />
            {(this.state.showRequirements && !this.state.validPassword) &&
              <FormValidationMessage>
                {`${this.state.passwordErrors.join('\n')}`}
              </FormValidationMessage>
            }
          </View>
          <View style={styles.buttonContainer}>
            <Button
              large
              icon={{ name: 'done' }}
              title="Sign Up"
              onPress={this.handleSignup}
              disabled={!(this.state.usernameInput && this.state.passwordInput)}
              backgroundColor={color.PRIMARY}
              disabledStyle={styles.buttonDisabled}
            />
          </View>
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
