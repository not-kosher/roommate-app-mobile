import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HouseNavBack from '../HouseNavBack';

class BillsView extends Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>BILLS!</Text>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
  };
};

const BillsViewRedux = connect(mapStateToProps, null)(BillsView);

const Bills = StackNavigator({
  Bills: {
    screen: BillsViewRedux,
    navigationOptions: ({ navigation }) => ({
      title: 'Bills',
      headerLeft: <HouseNavBack navigation={navigation} />,
    }),
  },
});

export default Bills;
