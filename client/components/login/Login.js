import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  TouchableOpacity,
  Text,
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
import { retrieveUser } from '../../redux/actions/userActions';
import { getHouse, getRoomies, updateSocketReady } from '../../redux/actions/houseActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      validEmail: false,
      passwordInput: '',
      isLoggingIn: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  handleLogin() {
    this.setState({ isLoggingIn: true });
    auth.login(this.state.usernameInput, this.state.passwordInput, (err) => {
      if (err) {
        Alert.alert('Error', form.parseError(err));
        this.setState({ isLoggingIn: false });
        return;
      }
      this.props.retrieveUser(this.state.usernameInput, ({ houseId }) => {
        if (houseId) {
          this.props.getHouse(houseId, () => {
            this.props.getRoomies(houseId, () => {
              this.props.updateSocketReady(true);
              this.setState({ isLoggingIn: false });
            });
          });
        }
      });
    });
  }

  updateUsername(usernameInput) {
    this.setState({
      usernameInput,
      validEmail: form.isValidEmail(usernameInput),
    });
  }

  render() {
    if (!this.state.isLoggingIn) {
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
            placeholder="Enter your password"
            onChangeText={passwordInput => this.setState({ passwordInput })}
            value={this.state.passwordInput}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            selectTextOnFocus
          />
          <Button
            large
            icon={{ name: 'done' }}
            title="Log In"
            onPress={this.handleLogin}
            disabled={!(this.state.usernameInput && this.state.passwordInput)}
          />
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
    getHouse: (houseId, cb) => {
      dispatch(getHouse(houseId, cb));
    },
    getRoomies: (houseId, cb) => {
      dispatch(getRoomies(houseId, cb));
    },
    updateSocketReady: (isReady) => {
      dispatch(updateSocketReady(isReady));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
