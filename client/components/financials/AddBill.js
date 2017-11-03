import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  DatePickerIOS,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import {
  CheckBox,
  FormInput,
  FormLabel,
  Button,
} from 'react-native-elements';

import * as color from '../../styles/common';
import socket from '../../socket/index';
import axios from '../../lib/customAxios';
import { createBill, createCharge, getAllCharges } from '../../redux/actions/financialActions';

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: color.BG_L_GRAY,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  label: {
    flex: 1,
  },
  roomieLabel: {
    flex: 2,
    alignItems: 'flex-end',
  },
  roomieLabelText: {
    fontWeight: 'normal',
  },
  input: {
    flex: 2,
  },
  roomieInput: {
    flex: 1,
  },
  button: {
    backgroundColor: color.PRIMARY,
    margin: 5,
  },
  checkbox: {
    backgroundColor: color.BG_L_GRAY,
  },
  checkboxLabel: {
    flex: 3,
    alignItems: 'flex-end',
  },
  dateButton: {
    flex: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: `${color.BG_D_GRAY}50`,
  },
  modalspacer: {
    flex: 1,
  },
  datePicker: {
    flex: 1,
    backgroundColor: color.BG_L_GRAY,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 40,
  },
});

class AddBill extends Component {
  constructor(props) {
    super(props);

    this.roomieAmmounts = {};

    this.state = {
      recurring: false,
      roomieAmmounts: {},
      date: new Date(),
      billName: '',
      total: '',
      setDate: false,
    };

    this.submitFinancial = this.submitFinancial.bind(this);
    this.createBill = this.createBill.bind(this);
    this.createCharges = this.createCharges.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
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
          this.sendNotification();
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
        this.sendNotification();
        this.props.navigation.goBack();
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
  sendNotification() {
    const billNotification = {
      houseId: this.props.houseId,
      userId: this.props.userId,
      type: 'bill',
      text: `has added a bill of $${this.state.total} for ${this.state.billName}!`,
      username: this.props.firstName,
    };
    socket.emit('addNotification', billNotification);
  }
  render() {
    return (
      <ScrollView style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <FormLabel style={styles.label}>Bill name:</FormLabel>
          <FormInput
            containerStyle={styles.input}
            onChangeText={name => this.setState({ billName: name })}
          />
        </View>
        <View style={styles.inputContainer}>
          <FormLabel style={styles.label}>Total: </FormLabel>
          <FormInput
            containerStyle={styles.input}
            onChangeText={(total) => {
              this.setState({ total });
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
              <View style={{ flex: 1, flexDirection: 'column' }} />
              <FormLabel
                containerStyle={styles.roomieLabel}
                labelStyle={styles.roomieLabelText}
              >
                {roomie.firstName}:
              </FormLabel>
              <FormInput
                containerStyle={styles.roomieInput}
                defaultValue={this.state.share}
                onChangeText={ammount => this.roomieAmmounts[roomie.id] = ammount}
              />
              <View style={{ flex: 0.5, flexDirection: 'column' }} />
            </View>);
        })}
        <Modal
          transparent
          animationType="fade"
          visible={this.state.setDate}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalspacer} />
            <View style={styles.datePicker}>
              <DatePickerIOS
                date={this.state.date}
                minimumDate={new Date()}
                mode="date"
                onDateChange={date => this.setState({ date })}
              />
              <Button
                title="Done"
                onPress={() => {
                  this.setState({ setDate: !this.state.setDate });
                }}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.inputContainer}>
          <FormLabel style={styles.label}>Due Date</FormLabel>
          <Button
            title={this.state.date.toLocaleDateString()}
            icon={{ name: 'edit' }}
            onPress={() => {
              this.setState({ setDate: !this.state.setDate });
            }}
            buttonStyle={styles.dateButton}
            containerViewStyle={styles.dateButton}
          />
        </View>
        <View style={{ flex: 1, margin: 10 }}>
          <CheckBox
            center
            title="Recurring bill?"
            checkedColor={color.PRIMARY}
            checked={this.state.recurring}
            onPress={() => {
              this.setState({
                recurring: !(this.state.recurring),
              });
            }}
            textStyle={{ color: '#88939d' }}
          />
        </View>
        <Button
          large
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
    firstName: store.user.firstName,
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
