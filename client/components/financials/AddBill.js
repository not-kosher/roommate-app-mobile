import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  DatePickerIOS,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  CheckBox,
  FormInput,
  FormLabel,
  Button,
} from 'react-native-elements';

import axios from '../../lib/customAxios';
import { createBill, createCharge, getAllCharges } from '../../redux/actions/financialActions';

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  roomieLabel: {
    flex: 1,
    flexDirection: 'column',
  },
  roomieInput: {
    flex: 2,
    flexDirection: 'column',
  },
  label: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#47a398',
  },
});

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
          this.props.navigation.goBack();
        })
        .catch(err => this.setState({ success: JSON.stringify(err) }));
    } else {
      this.createBill();
    }
  }
  createBill(recurringBill) {
    this.props.createBill(
      this.props.houseId,
      this.state.billName, +(this.state.total),
      this.props.userId, this.state.date,
      recurringBill,
      this.props.roomies,
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
      <ScrollView style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <FormLabel style={styles.roomieLabel}>Bill name:</FormLabel>
          <FormInput
            style={styles.roomieInput}
            placeholder="Bill name"
            onChangeText={name => this.setState({ billName: name })}
          />
        </View>
        <View style={styles.inputContainer}>
          <FormLabel style={styles.roomieLabel}>Total Ammmount: </FormLabel>
          <FormInput
            style={styles.roomieInput}
            placeholder="Total ammount"
            onChangeText={(total) => {
              this.setState({ total: total });
              this.setState({ share: (total / this.props.roomies.length).toFixed(2) });
              this.props.roomies.forEach((roomie) => {
                this.roomieAmmounts[roomie.id] = (total / this.props.roomies.length).toFixed(2);
              });
            }}
          />
        </View>
        {this.props.roomies.map((roomie) => {
          this.state[roomie.id] = '';
          return (
            <View key={roomie.id} style={styles.inputContainer}>
              <FormLabel style={styles.roomieLabel}>{roomie.firstName}</FormLabel>
              <FormInput
                containerStyle={styles.roomieInput}
                defaultValue={this.state.share}
                onChangeText={ammount => this.roomieAmmounts[roomie.id] = ammount}
              />
            </View>);
        })}
        <Button
          title="Submit"
          onPress={() => {
            this.setState({ setDate: true });
          }}
          buttonStyle={styles.button}
        />
        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          onDateChange={date => this.setState({ date: date })}
        />
        <CheckBox
          center
          containerStyle={{ backgroundColor: 'whitesmoke' }}
          title="Recurring"
          checkedColor="#47a398"
          checked={this.state.recurring}
          onPress={() => {
            this.setState({
              recurring: !(this.state.recurring),
            });
          }}
        />
        <Button
          title="Submit"
          onPress={() => {
            this.submitFinancial();
          }}
          buttonStyle={styles.button}
        />
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
    createBill: (houseId, billText, total, posterId, dueDate, recurringBillId, roomies, cb) => {
      dispatch(createBill(
        houseId,
        billText,
        total,
        posterId,
        dueDate,
        recurringBillId,
        roomies,
        cb,
      ));
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
