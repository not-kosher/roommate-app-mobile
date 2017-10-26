import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HouseNavBack from '../HouseNavBack';
import BillList from './BillList';
import AddBill from './AddBill';
import { getAllBills, deleteBill, deleteAllChargesForBill } from '../../redux/actions/financialActions';


class BillsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bills: [],
    };
    this.getBills = this.getBills.bind(this);
    this.getUserNames = this.getUserNames.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
  }
  componentWillMount() {
    this.getBills();
  }
  getBills() {
    this.props.getAllBills(this.props.houseId);
  }
  getUserNames() {
    this.props.bills.forEach((bill) => {
      const userId = bill.posterId;
      this.props.roomies.forEach((roomie) => {
        if (roomie.id === userId) {
          bill.posterName = roomie.firstName;
        }
      });
    });
    this.setState({ bills: this.state.bills });
  }
  deleteBill(bill) {
    this.props.deleteAllChargesForBill(bill.id, (billId) => {
      if (billId) {
        this.props.deleteBill(billId);
      }
    });
  }
  render() {
    return (
      <View>
        <BillList bills={this.props.bills} deleteBill={this.deleteBill} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddBill', { getAllBills: this.getAllBills })}>
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
    bills: store.financial.bills,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBills: (id) => {
      dispatch(getAllBills(id));
    },
    deleteBill: (id) => {
      dispatch(deleteBill(id));
    },
    deleteAllChargesForBill: (billId, cb) => {
      dispatch(deleteAllChargesForBill(billId, cb));
    },
  };
};

const BillsViewRedux = connect(mapStateToProps, mapDispatchToProps)(BillsView);

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
