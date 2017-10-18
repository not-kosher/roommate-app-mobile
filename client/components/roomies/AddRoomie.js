import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class AddRoomie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',

    };
  }

  render() {
    return (
      <View>
        <Text>{this.props.username}</Text>
        <TextInput
          placeholder="Email adress"
          onChangeText={emailInput => this.setState({ emailInput })}
          value={this.state.emailInput}
        />
        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
          <Text>Invite Roomie</Text>
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

export default connect(mapStateToProps, null)(AddRoomie);
