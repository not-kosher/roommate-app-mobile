import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as auth from '../lib/authHelper';
import { retrieveUser, updateSocketStatus } from '../redux/actions/userActions';
import { getRoomies, getHouse, updateSocketReady } from '../redux/actions/houseActions';
import { getNotifications, addNotification } from '../redux/actions/notificationActions';
import { getMessages, addMessage } from '../redux/actions/messageActions';
import HouseNav from './HouseNav';
import LoginNav from './login/LoginNav';
import EditProfile from './profile/EditProfile';
import HouseEntry from './login/HouseEntry';
import socket from '../socket';

class App extends Component {
  componentWillMount() {
    auth.reAuthUser((username) => {
      this.props.retrieveUser(username, ({ houseId }) => {
        if (houseId) {
          this.props.getHouse(houseId, () => {
            this.props.getRoomies(houseId, () => {
              this.props.updateSocketReady(true);
            });
          });
        }
      });
    });
    // TODO
    // add some kind of loading page while this is happening
  }

  componentDidUpdate() {
    if (!this.props.isConnectedToSocket && this.props.readyToJoinSocket) {
      this.socketSetup();
    }
  }

  componentWillUnmount() {
    if (this.props.houseId) {
      socket.emit('leaveHouse', this.props.houseId);
    }

    socket.off('newNotification');
    socket.off('newChatMessage');

    this.props.updateSocketStatus(false);
  }

  socketSetup() {
    socket.emit('joinHouse', this.props.houseId);

    this.props.getNotifications(this.props.houseId);
    console.log(`Roomies before call to get messages: ${this.props.roomies}`);
    this.props.getMessages(this.props.houseId, this.props.roomies);

    socket.on('newNotification', (notification) => {
      this.props.addNotification(notification);
    });

    socket.on('newChatMessage', (messages) => {
      console.log('ADDING NEW MESSAGE IN SOCKET');
      this.props.addMessage(messages);
    });

    this.props.updateSocketStatus(true);
  }

  render() {
    if (!this.props.username) {
      return <LoginNav />;
    } else if (!this.props.firstName) {
      return <EditProfile />;
    } else if (!this.props.houseId) {
      return <HouseEntry />;
    }

    return <HouseNav />;
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  firstName: state.user.firstName,
  houseId: state.user.houseId,
  roomies: state.house.roomies,
  isConnectedToSocket: state.user.isConnectedToSocket,
  readyToJoinSocket: state.house.readyToJoinSocket,
});

const mapDispatchToProps = dispatch => ({
  retrieveUser: (username, cb) => {
    dispatch(retrieveUser(username, cb));
  },
  getRoomies: (id, cb) => {
    dispatch(getRoomies(id, cb));
  },
  getHouse: (id, cb) => {
    dispatch(getHouse(id, cb));
  },
  getNotifications: (houseId) => {
    dispatch(getNotifications(houseId));
  },
  addNotification: (notification) => {
    dispatch(addNotification(notification));
  },
  getMessages: (houseId, roomies) => {
    dispatch(getMessages(houseId, roomies));
  },
  addMessage: (messages) => {
    dispatch(addMessage(messages));
  },
  updateSocketStatus: (isConnected) => {
    dispatch(updateSocketStatus(isConnected));
  },
  updateSocketReady: (isReady) => {
    dispatch(updateSocketReady(isReady));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
