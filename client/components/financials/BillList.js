import React from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';

import BillEntry from './BillEntry';

const BillList = ({ bills, deleteBill }) => {
  return (
    <ScrollView>
      {bills.map((bill) => {
        return <BillEntry bill={bill} key={bill.id} deleteBill={deleteBill} />;
      })}
      <BillEntry />
    </ScrollView>
  );
};

export default BillList;
