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
      success: '',
      share: '',
      roomieId: '',
      abit: '',

    };

    this.submitFinancial = this.submitFinancial.bind(this);
    this.createBill = this.createBill.bind(this);
    this.createCharges = this.createCharges.bind(this)
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
          this.createCharges();
        })
        .catch(err => this.setState({ success: JSON.stringify(err) }));
    } else {
      this.createBill();
      this.createCharges();
    }
  }
  createBill(recurringBill) {
    axios.post('/api/bills', {
      houseId: this.props.houseId,
      text: this.state.billName,
      total: +(this.state.total),
      posterId: this.props.userId,
      dueDate: this.state.date,
      recurringbillId: recurringBill,
    })
      .then(() => this.setState({ success: 'sucess' }))
      .catch(err => this.setState({ success: JSON.stringify(err) }));
  }
  createCharges() {
    for (var roomieId in this.roomieAmmounts) {
      axios.post('/api/charges', {
        houseId: this.props.houseId,
        billText: this.state.billName,
        total: +(this.roomieAmmounts[roomieId]),
        lenderId: this.props.userId,
        debtorId: roomieId,
      })
        .then(result => this.setState({ success: JSON.stringify(result) }))
        .catch(err => this.setState({ success: JSON.stringify(err) }));
    };
  }
  render() {
    return (
      <ScrollView>
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
  };
};

export default connect(mapStateToProps, null)(AddBill);
