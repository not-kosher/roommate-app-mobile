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
        }
      });
    });
    // TODO
    // add some kind of loading page while this is happening
  }

  socketSetup() {
    socket.emit('joinHouse', this.props.houseId);

    this.props.getNotifications(this.props.houseId);
    this.props.getMessages(this.props.houseId);

    socket.on('newNotification', (notification) => {
      this.props.addNotification(notification);
    });

    socket.on('newChatMessage', (messages) => {
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
    this.socketSetup();
    return <HouseNav />;
  }
}

const mapStateToProps = store => ({
  username: store.user.username,
  firstName: store.user.firstName,
  houseId: store.user.houseId,
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
  getMessages: (houseId) => {
    dispatch(getMessages(houseId));
  },
  addMessage: (messages) => {
    dispatch(addMessage(messages));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
