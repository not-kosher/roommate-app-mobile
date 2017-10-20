import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import HouseNav from './HouseNav';
import LoginNav from './login/LoginNav';
import { retrieveUser } from '../redux/actions/userActions';

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
    if (this.props.houseId) {
      return <HouseNav />;
    }

    return <LoginNav />;
  }
}

const mapStateToProps = (store) => {
  return {
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
