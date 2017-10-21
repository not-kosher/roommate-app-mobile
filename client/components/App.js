import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { retrieveUser } from '../redux/actions/userActions';
import { getRoomies, getHouse } from '../redux/actions/houseActions';
import HouseNav from './HouseNav';
import LoginNav from './login/LoginNav';
import EditProfile from './profile/EditProfile';
import HouseEntry from './login/HouseEntry';

class App extends Component {
  componentWillMount() {
    // check Asyncstore for user info
    // if there is a username, retrieve the user info
    // TODO
    // add some kind of loading page while this is happening
    // also grab house info when logging in
    AsyncStorage.getItem('houseId')
      .then((houseId) => {
        if (houseId) {
          console.log('Here is from async', houseId);
          this.props.getHouse(houseId);
          this.props.getRoomies(houseId);
        }
        return AsyncStorage.getItem('username');
      })
      .then((username) => {
        if (username) {
          this.props.retrieveUser(username);
        }
      })
      .catch((err) => {
        // username or houseid not found, so do nothing
        console.log('Error retreiving from AsyncStorage', err);
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
    return <HouseNav />;
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
    firstName: store.user.firstName,
    houseId: store.user.houseId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveUser: (username) => {
      dispatch(retrieveUser(username));
    },
    getRoomies: (id) => {
      dispatch(getRoomies(id));
    },
    getHouse: (id) => {
      dispatch(getHouse(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
