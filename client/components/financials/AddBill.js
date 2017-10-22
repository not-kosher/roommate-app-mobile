import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  CheckBox,
} from 'react-native-elements';

class AddBill extends Component {
  constructor(props) {
    super(props);

    this.roomieAmmounts = {};

    this.state = {
      checked: true,
      roomieAmmounts: {},
    };

  }

  render() {
    return (
      <View>
        <Text>Bill name:</Text>
        <TextInput placeholder="Bill name" />
        <Text>Total Ammmount: $</Text>
        <TextInput placeholder="Total ammount" />
        {this.props.roomies.map((roomie) => {
          this.state[roomie.id] = '';
          return (<View key={roomie.id} >
            <Text>{roomie.firstName}</Text>
            <TextInput
              onChangeText={ammount => this.roomieAmmounts[roomie.id] = ammount}
            />
          </View>);
            
        })}
        <CheckBox
          title='Recurring'
          checked={this.state.checked}
          onPress={() => {
            this.setState({
              checked: !(this.state.checked),
            });
          }}
        />
        <TouchableOpacity onPress={() => this.setState({roomieAmmounts: this.roomieAmmounts})}>
          <Text>{JSON.stringify(this.roomieAmmounts)}</Text>
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

export default connect(mapStateToProps, null)(AddBill);
