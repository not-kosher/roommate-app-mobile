import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from '../../lib/customAxios';

import HouseNavBack from '../HouseNavBack';
import ChargeList from './ChargeList';

class ChargesView extends Component {
  constructor() {
    super();

    this.state = {
      charges: [],
    };
  }
  componentWillMount() {
    axios.get(`api/charges/${this.props.houseId}`)
      .then(charges => this.setState({ charges: charges.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <View>
        <Text>CHARGES!</Text>
        <ChargeList charges={this.state.charges} />
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

const ChargesViewRedux = connect(mapStateToProps, null)(ChargesView);

const Charges = StackNavigator({
  Charges: {
    screen: ChargesViewRedux,
    navigationOptions: ({ navigation }) => ({
      title: 'Charges',
      headerLeft: <HouseNavBack navigation={navigation} />,
    }),
  },
});

export default Charges;
