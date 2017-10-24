import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as auth from '../lib/authHelper';
import { retrieveUser } from '../redux/actions/userActions';
import { getRoomies, getHouse } from '../redux/actions/houseActions';
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
          this.props.getHouse(houseId);
          this.props.getRoomies(houseId);
          // join socket
        }
      });
    });
    // TODO
    // add some kind of loading page while this is happening
  }

  componentWillUnmount() {
    if (this.props.houseId) {
      socket.emit('leaveHouse', this.props.houseId);
    }

    socket.off('newNotification');
    socket.off('newChatMessage');
  }

  socketSetup() {
    socket.emit('joinHouse', this.props.houseId);

    this.props.getNotifications(this.props.houseId);
    this.props.getMessages(this.props.houseId, this.props.roomies);

    socket.on('newNotification', (notification) => {
      this.props.addNotification(notification);
    });

    socket.on('newChatMessage', (messages) => {
      console.log('ADDING NEW MESSAGE IN SOCKET');
      this.props.addMessage(messages);
    });
  }

  render() {
    if (!this.props.username) {
      return <LoginNav />;
    } else if (!this.props.firstName) {
      return <EditProfile />;
    } else if (!this.props.houseId) {
      return <HouseEntry />;
    }

    // now entering house so connect to socket
    console.log('SETTING UP SOCKET');
    this.socketSetup();
    return <HouseNav />;
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  firstName: state.user.firstName,
  houseId: state.user.houseId,
  roomies: state.house.roomies,
});

const mapDispatchToProps = dispatch => ({
  retrieveUser: (username, cb) => {
    dispatch(retrieveUser(username, cb));
  },
  getRoomies: (id) => {
    dispatch(getRoomies(id));
  },
  getHouse: (id) => {
    dispatch(getHouse(id));
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
