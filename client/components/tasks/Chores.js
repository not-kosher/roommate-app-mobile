import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  Divider,
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import axios from '../../lib/customAxios';
import socket from '../../socket/index';
import HouseNavBack from '../HouseNavBack';
import * as color from '../../styles/common';

import ChoreList from './ChoreList';


const styles = StyleSheet.create({
  choresContainer: {
    flex: 1,
    backgroundColor: color.BG_L_GRAY,
  },
  choresListContainer: {
    flex: 6,
  },
  divider: {
    backgroundColor: color.DIV_GRAY,
    height: 0.5,
  },
  addChoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitFormColumnButton: {
    flex: 1,
    flexDirection: 'column',
  },
  submitFormColumnInput: {
    flex: 2.5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    margin: 8,
    flex: 1,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.PRIMARY,

  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
});

class ChoresView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chores: [],
      text: '',
      addingChore: false,
    };

    this.getChores = this.getChores.bind(this);
    this.postChore = this.postChore.bind(this);
    this.claimChore = this.claimChore.bind(this);
    this.completeChore = this.completeChore.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }
  componentWillMount() {
    this.getChores();
  }
  getChores() {
    axios.get(`/api/tasks/${this.props.houseId}`)
      .then((tasks) => {
        const onlyChores = tasks.data.filter(chore => chore.type === 'chore');
        onlyChores.forEach((chore) => {
          this.props.roomies.forEach((roomie) => {
            if (roomie.id === chore.posterId) {
              chore.poster = roomie.firstName;
              chore.posterImage = roomie.imageUrl
            } 
            if (roomie.id === chore.claimerId) {
              chore.claimer = roomie.firstName;
              chore.claimerImage = roomie.imageUrl
            }
          });
        });
        this.setState({ chores: onlyChores });
      })
      .catch(err => console.log('Error retrieving tasks', err));
  }
  postChore() {
    axios.post('api/tasks/', {
      houseId: this.props.houseId,
      posterId: this.props.userId,
      text: this.state.text,
      type: 'chore',
    })
      .then((chore) => {
        this.sendNotification();
        const newChore = chore.data[0];
        newChore.poster = this.props.firstName;
        newChore.posterImage = this.props.userImage;
        this.state.chores.push(newChore);
        this.setState({
          addingChore: !this.state.addingChore,
          chores: this.state.chores,
        });
      })
      .catch(err => console.log('Error posting task', err));
  }
  claimChore(taskId) {
    axios.put(`api/tasks/${taskId}`, {
      claimerId: this.props.userId,
    })
      .then((task) => {
        this.state.chores.forEach((chore) => {
          if (chore.id === task.id) {
            chore.claimer = this.props.firstName;
            chore.claimerId = this.props.userId;
          }
        });
        this.setState({ chores: this.state.chores });
      })
      .catch(err => console.log('Error claiming task', err));
  }
  completeChore(taskId) {
    axios.delete(`api/tasks/${taskId}`)
      .then(() => {
        this.setState({ chores: this.state.chores.filter(chore => chore.id !== taskId) });
      })
      .catch(err => console.log('Error deleting task', err));
  }
  sendNotification() {
    const choreNotification = {
      houseId: this.props.houseId,
      userId: this.props.userId,
      type: 'chore',
      text: `has added ${this.state.text} to chores`,
      username: this.props.firstName,
    };
    socket.emit('addNotification', choreNotification);
  }
  render() {
    return (
      <View style={styles.choresContainer}>
        <View style={styles.choresListContainer}>
          <ChoreList
            chores={this.state.chores}
            claimChore={this.claimChore}
            firstName={this.props.firstName}
            completeChore={this.completeChore}
            userId={this.props.userId}
            userImage={this.props.userImage}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.addChoreContainer}>
          <View style={styles.submitFormColumnInput}>
            <TextInput
              ref={component => this._choreInput = component}
              placeholder="Add Chore"
              style={styles.input}
              onChangeText={task => this.setState({ text: task })}
            />
          </View>
          <View style={styles.submitFormColumnButton}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                this.postChore();
                this._choreInput.setNativeProps({text: ''});
              }}
            >
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
    firstName: store.user.firstName,
    roomies: store.house.roomies,
    houseId: store.user.houseId,
    userId: store.user.id,
    userImage: store.user.imageUrl,
  };
};

const ChoresViewRedux = connect(mapStateToProps, null)(ChoresView);

const Chores = StackNavigator(
  {
    Chores: {
      screen: ChoresViewRedux,
      navigationOptions: ({ navigation }) => ({
        title: 'Chores',
        headerLeft: <HouseNavBack navigation={navigation} />,
      }),
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { borderBottomColor: color.PRIMARY, backgroundColor: color.PRIMARY },
      headerTitleStyle: { color: color.WHITE },
      headerTintColor: color.WHITE,
    }),
  },
);

export default Chores;
