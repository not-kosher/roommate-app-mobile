import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { retrieveUser } from '../redux/actions/userActions';
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
    AsyncStorage.getItem('username')
      .then((username) => {
        if (username) {
          this.props.retrieveUser(username);
        }
      })
      .catch((err) => {
        // username not found, so do nothing
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
