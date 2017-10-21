import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import ChargeEntry from './ChargeEntry'

const ChargeList = () => {
  return (
    <View>
      <Text> Charge List </Text>
      <ChargeEntry />
    </View>
  );
};

export default ChargeList;
