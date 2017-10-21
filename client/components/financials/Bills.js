import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../lib/customAxios';
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
  constructor(props) {
    super(props);

    this.state = {
      bills: [],
    };
  }
  componentWillMount() {
    axios.get(`api/bills/${this.props.houseId}`)
      .then(bills => this.setState({ bills: bills.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <View>
        <Text>BILLS!</Text>

        <BillList bills={this.state.bills} />
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
    roomies: store.house.roomies,
    houseId: store.user.houseId,
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
