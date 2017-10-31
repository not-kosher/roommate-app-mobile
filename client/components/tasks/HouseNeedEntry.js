import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Avatar,
} from 'react-native-elements';

const HouseNeedEntry = ({ houseNeed }) => {
  return (
    <View>
      <Text>{houseNeed.text}</Text>
      <Text>{houseNeed.posterId}</Text>
    </View>
  );
}

export default HouseNeedEntry;