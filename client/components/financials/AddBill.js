import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  DatePickerIOS,
  ScrollView,
} from 'react-native';
import {
  CheckBox,
} from 'react-native-elements';

import axios from '../../lib/customAxios';
import { createBill, createCharge, getAllCharges } from '../../redux/actions/financialActions';

class AddBill extends Component {
  constructor(props) {
    super(props);

    this.roomieAmmounts = {};

    this.state = {
      recurring: true,
      roomieAmmounts: {},
      date: new Date(),
      billName: '',
      total: '',
    };

    this.submitFinancial = this.submitFinancial.bind(this);
    this.createBill = this.createBill.bind(this);
    this.createCharges = this.createCharges.bind(this);
  }
  submitFinancial() {
    if (this.state.recurring) {
      axios.post('/api/recurringBills', {
        houseId: this.props.houseId,
        text: this.state.billName,
        total: +(this.state.total),
        userId: this.props.userId,
        dueDate: this.state.date,
      })
        .then((result) => {
          this.createBill(result.data[0].id);
        })
        .catch(err => this.setState({ success: JSON.stringify(err) }));
    } else {
      this.createBill();
      this.props.navigation.state.params.getAllBills();
    }
  }
  createBill(recurringBill) {
    this.props.createBill(
      this.props.houseId,
      this.state.billName, +(this.state.total),
      this.props.userId, this.state.date,
      recurringBill,
      (billId) => {
        this.createCharges(billId, () => {
          this.props.getAllCharges(this.props.houseId, this.props.roomies, this.props.userId);
        });
      },
    );
  }
  createCharges(billId) {
    for (const roomieId in this.roomieAmmounts) {
      this.props.createCharge(
        this.props.houseId,
        this.state.billName,
        +this.roomieAmmounts[roomieId],
        this.props.userId, roomieId, billId,
        () => {
          this.props.getAllCharges(this.props.houseId, this.props.roomies, this.props.userId);
        },
      );
    }
  }
  render() {
    return (
      <ScrollView>
        <Text>{this.state.success}</Text>
        <Text>Bill name:</Text>
        <TextInput
          placeholder="Bill name"
          onChangeText={name => this.setState({ billName: name })}
        />
        <Text>Total Ammmount: $</Text>
        <TextInput
          placeholder="Total ammount"
          onChangeText={(total) => {
            this.setState({ total: total });
            this.setState({ share: (total / this.props.roomies.length).toFixed(2) });
            this.props.roomies.forEach((roomie) => {
              this.roomieAmmounts[roomie.id] = (total / this.props.roomies.length).toFixed(2);
            });
          }}
        />
        {this.props.roomies.map((roomie) => {
          this.state[roomie.id] = '';
          return (
            <View key={roomie.id} >
              <Text>{roomie.firstName}</Text>
              <TextInput
                defaultValue={this.state.share}
                onChangeText={ammount => this.roomieAmmounts[roomie.id] = ammount}
              />
            </View>);
        })}
        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          onDateChange={date => this.setState({ date: date })}
        />
        <CheckBox
          title="Recurring"
          checked={this.state.recurring}
          onPress={() => {
            this.setState({
              recurring: !(this.state.recurring),
            });
          }}
        />
        <TouchableOpacity onPress={() => this.submitFinancial()}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}


const mapStateToProps = (store) => {
  return {
    username: store.user.username,
    userId: store.user.id,
    roomies: store.house.roomies,
    houseId: store.user.houseId,
    bills: store.financial.bills,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBill: (houseId, billText, total, posterId, dueDate, recurringBillId, cb) => {
      dispatch(createBill(houseId, billText, total, posterId, dueDate, recurringBillId, cb));
    },
    createCharge: (houseId, billsText, total, lenderId, debtorId, billId, cb) => {
      dispatch(createCharge(houseId, billsText, total, lenderId, debtorId, billId, cb));
    },
    getAllCharges: (id, roomies, userId, cb) => {
      dispatch(getAllCharges(id, roomies, userId, cb));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBill);
