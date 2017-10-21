import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HouseNavBack from '../HouseNavBack';
import BillList from './BillList'
import AddBill from './AddBill';

class BillsView extends Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>BILLS!</Text>
        <BillList />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddBill')}>
          <Text>Add Bill</Text>
        </TouchableOpacity>
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
  AddBill: { screen: AddBill },
});

export default Bills;
