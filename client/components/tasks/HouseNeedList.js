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

import HouseNeedEntry from './HouseNeedEntry'

const HouseNeedList = ({ houseNeeds }) => {
  return (
    <View>
      <Text>HouseNeedList</Text>
      {
        houseNeeds.map((houseNeed) => {
          return <HouseNeedEntry houseNeed={houseNeed} key={houseNeed.id} />;
        })
      }
    </View>
  );
}

export default HouseNeedList;