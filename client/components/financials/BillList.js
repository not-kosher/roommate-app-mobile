import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import BillEntry from './BillEntry'

const BillList = () => {
  return (
    <View>
      <Text> Bill List </Text>
      <BillEntry />
    </View>
  );
};

export default BillList;
