import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { createHouse, joinHouse } from '../../redux/actions/houseActions';

class HouseEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createName: '',
      joinName: '',
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
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
          placeholder="House Key"
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
}

const mapStateToProps = (store) => {
  return {
    id: store.house.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createHouse: (name) => {
      dispatch(createHouse(name));
    },
    joinHouse: (key) => {
      dispatch(joinHouse(key));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseEntry);
