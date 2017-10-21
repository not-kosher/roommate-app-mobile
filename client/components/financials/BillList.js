import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import BillEntry from './BillEntry';

const BillList = ({ bills }) => {
  return (
    <View>
      {bills.map((bill) => {
        return <BillEntry bill={bill} key={bill.id} />;
      })}
      <BillEntry />
    </View>
  );
};

export default BillList;
