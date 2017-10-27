import React from 'react';
import {
  ScrollView,
  View,
  Text,
} from 'react-native';

import BillEntry from './BillEntry';

const BillList = ({ bills, deleteBill }) => {
  return (
    <View style={styles.billList}>
      <ScrollView style={styles.billEntry}>
        {bills.map((bill) => {
          return <BillEntry bill={bill} key={bill.id} deleteBill={deleteBill} />;
        })}

      </ScrollView>
    </View>
  );
};

const styles = {
  billList: {
    flex: 1,
  },
  billEntry: {
    flex: 1,
  },
};

export default BillList;
