import React, { Component } from 'react';
import { connect } from 'react-redux';
import HouseNav from './HouseNav';
import LoginNav from './login/LoginNav';

class App extends Component {
  render() {
    if (this.props.username) {
      return <HouseNav />;
    }

    return <LoginNav />;
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
  };
};

export default connect(mapStateToProps, null)(App);
