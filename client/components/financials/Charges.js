import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import * as color from '../../styles/common';
import HouseNavBack from '../HouseNavBack';
import ChargeList from './ChargeList';
import { getAllCharges, deleteSingleCharge } from '../../redux/actions/financialActions';


class ChargesView extends Component {
  constructor(props) {
    super(props);

    this.getCharges = this.getCharges.bind(this);
    this.deleteCharge = this.deleteCharge.bind(this);
  }
  componentWillMount() {
    this.getCharges();
  }
  getCharges() {
    this.props.getAllCharges(this.props.houseId, this.props.roomies, this.props.userId);
  }
  deleteCharge(chargeId) {
    this.props.deleteSingleCharge(chargeId, () => {
      this.getCharges();
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {<ChargeList charges={this.props.formattedCharges} deleteCharge={this.deleteCharge} />}
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
    charges: store.financial.charges,
    formattedCharges: store.financial.formattedCharges,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCharges: (id, roomies, userId, cb) => {
      dispatch(getAllCharges(id, roomies, userId, cb));
    },
    deleteSingleCharge: (chargeId, cb) => {
      dispatch(deleteSingleCharge(chargeId, cb));
    },
  };
};

const ChargesViewRedux = connect(mapStateToProps, mapDispatchToProps)(ChargesView);

const Charges = StackNavigator({
  Charges: {
    screen: ChargesViewRedux,
    navigationOptions: ({ navigation }) => ({
      title: 'Charges',
      headerLeft: <HouseNavBack navigation={navigation} />,
      headerStyle: { borderBottomColor: color.PRIMARY, backgroundColor: color.PRIMARY },
      headerTitleStyle: { color: color.WHITE },
      headerTintColor: color.WHITE,
    }),
  },
});

export default Charges;
