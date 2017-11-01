import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';

import BillEntry from './BillEntry';

const styles = StyleSheet.create({
  billList: {
    flex: 1,
  },
  billEntry: {
    flex: 1,
  },
});

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


export default BillList;
