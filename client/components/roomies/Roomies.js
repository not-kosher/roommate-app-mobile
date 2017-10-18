import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import RoomieList from './RoomieList';

const Roomies = props => (
  <View>
    <RoomieList />
    <TouchableOpacity onPress={() => props.navigation.navigate('AddRoomie')}>
      <Text>Add Roomie</Text>
    </TouchableOpacity>
  </View>
);

export default Roomies;
