import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

class Signup extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('Help me', this.state.username, this.state.password);
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="username"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          placeholder="password"
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity onPress={this.handleSubmit}>
          <View>
            <Text>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Signup;
