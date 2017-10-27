import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as auth from '../lib/authHelper';
import { retrieveUser } from '../redux/actions/userActions';
import { getRoomies, getHouse } from '../redux/actions/houseActions';
import HouseNav from './HouseNav';
import LoginNav from './login/LoginNav';
import EditProfile from './profile/EditProfile';
import HouseEntry from './login/HouseEntry';

// required for file parsing
global.Buffer = global.Buffer || require('buffer').Buffer;

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
    retrieveUser: (username, cb) => {
      dispatch(retrieveUser(username, cb));
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
