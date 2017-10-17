import React, { Component } from 'react';
import HouseNav from './HouseNav';
import LoginNav from './login/LoginNav';

class App extends Component {
  constructor() {
    super();
    // temporary for testing
    this.state = {
      user: '',
    };
  }

  render() {
    if (this.state.user) {
      return <HouseNav />;
    }

    return <LoginNav />;
  }
}

export default App;
