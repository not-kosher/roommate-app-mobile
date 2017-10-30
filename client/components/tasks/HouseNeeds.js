import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {
  Button,
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import axios from '../../lib/customAxios';
import HouseNavBack from '../HouseNavBack';


const styles = StyleSheet.create({

});

class HouseNeedsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      houseNeeds: [],
    };
  }
  componentWillMount() {
    axios.get(`/api/tasks/${this.props.houseId}`)
      .then((tasks) => {
        const onlyHouseNeeds = tasks.data.filter(chore => chore.type === 'houseneed');
        this.setState({ houseNeeds: onlyHouseNeeds });
      })
      .catch((err) => {
        console.log('Error retrieving tasks', err);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>HouseNeeds</Text>
        <Text>{JSON.stringify(this.state.houseNeeds)}</Text>
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
  };
};

const HouseNeedsViewRedux = connect(mapStateToProps, null)(HouseNeedsView)


const HouseNeeds = StackNavigator({
  HouseNeeds: {
    screen: HouseNeedsViewRedux,
    navigationOptions: ({ navigation }) => ({
      title: 'HouseNeeds',
      headerLeft: <HouseNavBack navigation={navigation} />,
    }),
  },
});

export default HouseNeeds;
