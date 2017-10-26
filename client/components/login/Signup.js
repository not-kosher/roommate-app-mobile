import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import * as auth from '../../lib/authHelper';
import { retrieveUser } from '../../redux/actions/userActions';

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
    auth.signup(this.state.usernameInput, this.state.passwordInput, () => {
      this.props.retrieveUser(this.state.usernameInput);
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
