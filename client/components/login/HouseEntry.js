import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class HouseEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createName: '',
      joinName: '',
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoinm = this.handleJoinm.bind(this);
  }

  handleCreate() {
    console.log(this.state.createName);
  }

  handleJoin() {
    console.log(this.state.joinName);
  }

  render() {
    return (
      <View>
        <Text>Create a house</Text>
        <TextInput
          placeholder="House Name"
          value={this.state.createName}
          onChangeText={createName => this.setState({ createName })}
        />
        <TouchableOpacity onPress={this.handleCreate}>
          <View>
            <Text>Create</Text>
          </View>
        </TouchableOpacity>
        <Text>Join a house</Text>
        <TextInput
          placeholder="House Name"
          value={this.state.joinName}
          onChangeText={joinName => this.setState({ joinName })}
        />
        <TouchableOpacity onPress={this.handleJoin}>
          <View>
            <Text>Join</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default HouseEntry;
