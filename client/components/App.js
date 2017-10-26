import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import * as auth from '../lib/authHelper';
import { retrieveUser } from '../redux/actions/userActions';
import { getRoomies, getHouse } from '../redux/actions/houseActions';
import HouseNav from './HouseNav';
import LoginNav from './login/LoginNav';
import EditProfile from './profile/EditProfile';
import HouseEntry from './login/HouseEntry';

class App extends Component {
  componentWillMount() {
    auth.reAuthUser();
    // TODO
    // add some kind of loading page while this is happening
    AsyncStorage.getItem('houseId')
      .then((houseId) => {
        if (houseId) {
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
