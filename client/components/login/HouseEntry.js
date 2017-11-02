import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {
  FormInput,
  FormLabel,
  Button,
} from 'react-native-elements';

import * as color from '../../styles/common';
import { createHouse, updateSocketReady } from '../../redux/actions/houseActions';
import { joinHouse } from '../../redux/actions/userActions';
import socket from '../../socket';
import FullScreenLoading from '../loading/FullScreenLoading';

const styles = {
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    marginTop: 60,
    marginBottom: 60,
    justifyContent: 'space-between',
  },
  backgroundWhite: {
    backgroundColor: color.WHITE,
  },
  backgroundGray: {
    backgroundColor: color.BG_L_GRAY,
  },
};

class HouseEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createName: '',
      joinKey: '',
      isProcessing: false,
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  handleCreate() {
    this.setState({ isProcessing: true });

    this.props.createHouse(this.state.createName, (houseId) => {
      AsyncStorage.setItem('houseId', `${houseId}`);
      this.props.updateSocketReady(true);
    });
  }

  handleJoin() {
    this.setState({ isProcessing: true });

    this.props.joinHouse(this.state.joinKey, () => {
      this.props.updateSocketReady(true);

      const joinNotification = {
        houseId: this.state.joinKey, // need to have houseId later
        userId: this.props.userId,
        type: 'new roomie',
        text: `${this.props.firstName} ${this.props.lastName} has joined the house!`,
      };

      socket.emit('addNotification', joinNotification);
    });
    AsyncStorage.setItem('houseId', `${this.state.joinKey}`);
  }

  render() {
    if (!this.state.isProcessing) {
      return (
        <View style={styles.container}>
          <View style={{ ...styles.innerContainer, ...styles.backgroundWhite }}>
            <View style={styles.formContainer}>
              <FormLabel>Join a house with your friends!</FormLabel>
              <FormInput
                placeholder="Enter the house key"
                value={this.state.joinKey}
                onChangeText={joinKey => this.setState({ joinKey })}
              />
              <Button
                large
                title="Join"
                onPress={this.handleJoin}
                backgroundColor={color.PRIMARY}
              />
            </View>
          </View>
          <View style={{ ...styles.innerContainer, ...styles.backgroundGray }}>
            <View style={styles.formContainer}>
              <FormLabel>{'Don\'t have a house to join? Create one!'}</FormLabel>
              <FormInput
                placeholder="Enter a house name"
                value={this.state.createName}
                onChangeText={createName => this.setState({ createName })}
              />
              <Button
                large
                title="Create"
                onPress={this.handleCreate}
                backgroundColor={color.PRIMARY}
              />
            </View>
          </View>
        </View>
      );
    }

    return <FullScreenLoading displayBall />;
  }
}

const mapStateToProps = (store) => {
  return {
    houseId: store.user.houseId,
    userId: store.user.id,
    firstName: store.user.firstName,
    lastName: store.user.lastName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createHouse: (name, cb) => {
      dispatch(createHouse(name, cb));
    },
    joinHouse: (key, cb) => {
      dispatch(joinHouse(key, cb));
    },
    updateSocketReady: (isReady) => {
      dispatch(updateSocketReady(isReady));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseEntry);
