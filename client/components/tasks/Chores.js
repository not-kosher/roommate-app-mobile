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

class ChoresView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chores: [],
    };
  }
  componentWillMount() {
    axios.get(`/api/tasks/${this.props.houseId}`)
      .then((tasks) => {
        const onlyChores = tasks.data.filter(chore => chore.type === 'chore');
        this.setState({ chores: onlyChores });
      })
      .catch((err) => {
        console.log('Error retrieving tasks', err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Chores</Text>
        <Text>{JSON.stringify(this.state.chores)}</Text>
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

const ChoresViewRedux = connect(mapStateToProps, null)(ChoresView)

const Chores = StackNavigator({
  Chores: {
    screen: ChoresViewRedux,
    navigationOptions: ({ navigation }) => ({
      title: 'Chores',
      headerLeft: <HouseNavBack navigation={navigation} />,
    }),
  },
});

export default Chores;
