import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import Signup from './login/Signup';

class App extends Component {
  render() {
    return (
      <View>
        <Signup />
      </View>
    );
  }
}

export default App;
