import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class AddBill extends Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>ADD A BILL!</Text>
      </View>
    );
  }
}

export default AddBill;
