import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Button,
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import * as color from '../../styles/common';
import HouseNavBack from '../HouseNavBack';
import BillList from './BillList';
import AddBill from './AddBill';

import { getAllBills, deleteBill, deleteAllChargesForBill, getAllCharges } from '../../redux/actions/financialActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BG_L_GRAY,
  },
  billListContainer: {
    flex: 1,
  },
  button: {
    margin: 10,
    backgroundColor: color.PRIMARY,
  },
});

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
    this.props.getAllBills(this.props.houseId, this.props.roomies);
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
        this.props.deleteBill(billId, () => {
          this.props.getAllCharges(this.props.houseId, this.props.roomies, this.props.userId);
        });
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <BillList
          style={styles.billListContainer}
          bills={this.props.bills}
          deleteBill={this.deleteBill}
          userId={this.props.userId}
        />
        <Button
          buttonStyle={styles.button}
          title='Add Bill'
          onPress={() => this.props.navigation.navigate('AddBill')} 
        />
      </View>
    );
  }
}



const mapStateToProps = (store) => {
  return {
    username: store.user.username,
    roomies: store.house.roomies,
    houseId: store.user.houseId,
    userId: store.user.id,
    bills: store.financial.bills,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBills: (id, roomies) => {
      dispatch(getAllBills(id, roomies));
    },
    deleteBill: (id, cb) => {
      dispatch(deleteBill(id, cb));
    },
    deleteAllChargesForBill: (billId, cb) => {
      dispatch(deleteAllChargesForBill(billId, cb));
    },
    getAllCharges: (id, roomies, userId, cb) => {
      dispatch(getAllCharges(id, roomies, userId, cb));
    },
  };
};

const BillsViewRedux = connect(mapStateToProps, mapDispatchToProps)(BillsView);

const Bills = StackNavigator(
  {
    Bills: {
      screen: BillsViewRedux,
      navigationOptions: ({ navigation }) => ({
        title: 'Bills',
        headerLeft: <HouseNavBack navigation={navigation} />,
      }),
    },
    AddBill: {
      screen: AddBill,
      navigationOptions: ({ navigation }) => ({
        title: 'Add Bill',
      }),
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { borderBottomColor: color.PRIMARY, backgroundColor: color.PRIMARY },
      headerTitleStyle: { color: color.WHITE },
      headerTintColor: color.WHITE,
    }),
  },
);

export default Bills;
