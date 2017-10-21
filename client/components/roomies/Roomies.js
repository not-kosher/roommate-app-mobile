import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import axios from '../../lib/customAxios';
import RoomieList from './RoomieList';

class Roomies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomieList: [],
    };
  }
  componentWillMount() {
    axios.get('http://127.0.0.1:3000/api/roomies/1')
      .then((roomies) => {
        this.setState({
          roomieList: roomies.data,
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <View>
        <RoomieList roomies={this.state.roomieList} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddRoomie')}>
          <Text>Add Roomie</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Roomies;
