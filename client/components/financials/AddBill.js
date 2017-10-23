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
    };

    this.submitFinancial = this.submitFinancial.bind(this);
    this.createBill = this.createBill.bind(this);
  }
  submitFinancial() {
    if (this.state.recurring) {
      axios.post('/api/recurringBills', {
        houseId: this.props.houseId,
        text: this.state.billName,
        total: parseInt(this.state.total),
        userId: this.props.userId,
        dueDate: this.state.date,
      })
        .then((result) => {
          this.createBill(result.data[0].id);
        })
        .catch(err => this.setState({ success: JSON.stringify(err) }));
    } else {
      this.createBill();
    }
  }
  createBill(recurringBill) {
    axios.post('/api/bills', {
      houseId: this.props.houseId,
      text: this.state.billName,
      total: parseInt(this.state.total),
      posterId: this.props.userId,
      dueDate: this.state.date,
      recurringbillId: recurringBill,
    })
      .then(() => this.setState({ success: 'sucess' }))
      .catch(err => this.setState({ success: JSON.stringify(err) }));
  }
  render() {
    return (
      <ScrollView>
        <Text>{JSON.stringify(this.state.success)}</Text>
        <Text>Bill name:</Text>
        <TextInput
          placeholder="Bill name"
          onChangeText={name => this.setState({ billName: name })}
        />
        <Text>Total Ammmount: $</Text>
        <TextInput 
          placeholder="Total ammount"
          onChangeText={total => this.setState({ total: total })}
        />
        {this.props.roomies.map((roomie) => {
          this.state[roomie.id] = '';
          return (
            <View key={roomie.id} >
              <Text>{roomie.firstName}</Text>
              <TextInput
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
        <TouchableOpacity onPress={() => this.setState({ roomieAmmounts: this.roomieAmmounts })}>
          <Text>{JSON.stringify(this.roomieAmmounts)}</Text>
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
