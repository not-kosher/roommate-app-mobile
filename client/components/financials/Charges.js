import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HouseNavBack from '../HouseNavBack';
import ChargeList from './ChargeList';
import { getAllCharges } from '../../redux/actions/financialActions';


class ChargesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formattedCharges: [],
    };

    this.getCharges = this.getCharges.bind(this);
    // this.formatCharges = this.formatCharges.bind(this);
    // this.findTotal = this.findTotal.bind(this)
  }
  componentWillMount() {
    this.getCharges();
  }
  getCharges() {
    this.props.getAllCharges(this.props.houseId, this.props.roomies, this.props.userId);
    // axios.get(`api/charges/${this.props.houseId}`)
    //   .then((charges) => {
    //     this.setState({ charges: charges.data })
    //     this.formatCharges(charges);
    //   })
    //   .catch(err => console.log(err));
  }
  // formatCharges(charges) {
  //   this.props.roomies.forEach((roomie) => {
  //     if (roomie.id !== this.props.userId) {
  //       const collectedCharges = [roomie];
  //       const chargesWhereRoomieOwesUser = [];
  //       const chargesWhereUserOwesRoomie = [];
  //       charges.forEach((charge) => {
  //         if (charge.lenderId === this.props.userId && charge.debtorId === roomie.id) {
  //           chargesWhereRoomieOwesUser.push(charge);
  //         } else if (charge.lenderId === roomie.id && charge.debtorId === this.props.userId) {
  //           chargesWhereUserOwesRoomie.push(charge);
  //         }
  //       });
  //       collectedCharges.push(this.findTotal(chargesWhereRoomieOwesUser, chargesWhereUserOwesRoomie));
  //       collectedCharges.push(chargesWhereRoomieOwesUser);
  //       collectedCharges.push(chargesWhereUserOwesRoomie);
  //       this.state.formattedCharges.push(collectedCharges);
  //     }
  //   });
  //   this.setState({ formattedCharges: this.state.formattedCharges });
  // }
  // findTotal(roomieOwesArr, userOwesArr) {
  //   let roomieOwesTotal = 0;
  //   let userOwesTotal = 0;
  //   roomieOwesArr.forEach((charge) => {
  //     roomieOwesTotal += charge.total;
  //   });
  //   userOwesArr.forEach((charge) => {
  //     userOwesTotal += charge.total;
  //   });
  //   return userOwesTotal - roomieOwesTotal;
  // }
  render() {
    return (
      <View>
        <Text>{typeof this.props.formattedCharges}</Text>
        {<ChargeList charges={this.props.formattedCharges} />}
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
  };
};

const ChargesViewRedux = connect(mapStateToProps, mapDispatchToProps)(ChargesView);

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
