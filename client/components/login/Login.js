import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Alert,
} from 'react-native';
import {
  FormInput,
  FormLabel,
  Button,
} from 'react-native-elements';

import * as auth from '../../lib/authHelper';
import form from '../../lib/formValidation';
import * as color from '../../styles/common';
import { retrieveUser } from '../../redux/actions/userActions';
import { getHouse, getRoomies, updateSocketReady } from '../../redux/actions/houseActions';
import TintedLoading from '../loading/TintedLoading';

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: '',
      isLoggingIn: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({ isLoggingIn: true });
    auth.login(this.state.usernameInput, this.state.passwordInput, (err) => {
      if (err) {
        Alert.alert('Error', form.parseError(err));
        this.setState({ isLoggingIn: false });
        return;
      }
      this.props.retrieveUser(this.state.usernameInput, (error, user) => {
        if (error) {
          Alert.alert('Error', 'There was an unknown error, please log in again');
          this.setState({ isLoggingIn: false });
        } else if (user) {
          this.props.getHouse(user.houseId, () => {
            this.props.getRoomies(user.houseId, () => {
              this.props.updateSocketReady(true);
            });
          });
        }
      });
    });
  }

  render() {
    if (!this.state.isLoggingIn) {
      return (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <FormLabel>Email</FormLabel>
            <FormInput
              placeholder="Enter your email"
              onChangeText={usernameInput => this.setState({ usernameInput })}
              value={this.state.usernameInput}
              autoCorrect={false}
              autoCapitalize="none"
            />
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
          </View>
          <View style={styles.buttonContainer}>
            <Button
              large
              icon={{ name: 'done' }}
              title="Log In"
              onPress={this.handleLogin}
              disabled={!(this.state.usernameInput && this.state.passwordInput)}
              backgroundColor={color.PRIMARY}
              disabledStyle={styles.buttonDisabled}
            />
          </View>
        </View>
      );
    }

    return <TintedLoading />;
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
