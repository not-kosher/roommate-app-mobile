import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HouseNavBack from '../HouseNavBack';
import ChargeList from './ChargeList';

class ChargesView extends Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>CHARGES!</Text>
        <ChargeList />
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
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
