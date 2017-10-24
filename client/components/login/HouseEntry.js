import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import { createHouse } from '../../redux/actions/houseActions';
import { joinHouse } from '../../redux/actions/userActions';

class HouseEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createName: '',
      joinKey: '',
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  handleCreate() {
    this.props.createHouse(this.state.createName, (houseId) => {
      AsyncStorage.setItem('houseId', `${houseId}`);
      // join socket
    });
  }

  handleJoin() {
    this.props.joinHouse(this.state.joinKey);
    AsyncStorage.setItem('houseId', `${this.state.joinKey}`);
    // join socket
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
          value={this.state.joinKey}
          onChangeText={joinKey => this.setState({ joinKey })}
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
    houseId: store.user.houseId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createHouse: (name, cb) => {
      dispatch(createHouse(name, cb));
    },
    joinHouse: (key) => {
      dispatch(joinHouse(key));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseEntry);
