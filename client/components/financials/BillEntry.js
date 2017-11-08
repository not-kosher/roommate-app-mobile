import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Card, Button } from 'react-native-elements'; 

import * as color from '../../styles/common';

const numbersToMonths = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dev',
}

const styles = StyleSheet.create({
  billEntryContainer: {
    flex: 1,
    height: 100,
    borderWidth: 1,
    borderColor: color.BG_D_GRAY,
    marginTop: 2.5,
    marginBottom: 2.5,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
  },
  billEntry: {
    flex: 1,
    flexDirection: 'row',
  },
  billDetails: {
    flex: 2,
    flexDirection: 'column',
    width: 30,
  },
  billTotal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  billTotalText: {
    fontWeight: '600',
    fontSize: 25,
    color: color.TEXT_M_GRAY,
  },
  billHeader: {
    fontWeight: '600',
    fontSize: 18,
    color: color.TEXT_D_GRAY,
  },
  billInfoRow: {
    flexDirection: 'row',
  },
  billInfoLabel: {
    color: color.TEXT_L_GRAY,
  },
  billInfo: {
    color: color.TEXT_D_GRAY,
  },
  button: {
    padding: 5,
    height: 40,
    width: 100,
    marginTop: 5,
    backgroundColor: color.PRIMARY,
  },
});

const BillEntry = ({ bill, deleteBill, userId }) => {
  return (
    <Card containerStyle={{ margin: 6, padding: 10 }}>
      {bill !== undefined &&
        <View style={styles.billEntry}>
          <View style={styles.billDetails}>
            <Text style={styles.billHeader}>{bill.text}</Text>
            <View style={styles.billInfoRow}>
              <Text style={styles.billInfoLabel}>Poster: </Text>
              <Text style={styles.billInfo}>{bill.userName}</Text>
            </View>
            <View style={styles.billInfoRow}>
              <Text style={styles.billInfoLabel}>Due Date: </Text>
              <Text style={styles.billInfo}>{`${numbersToMonths[bill.dueDate.slice(5, 7)]} ${bill.dueDate.slice(8, 10)}`}</Text>
            </View>
          </View>
          <View style={styles.billTotal}>
            <Text style={styles.billTotalText}>{`$${bill.total}`}</Text>
            {bill.posterId === userId &&
              <Button title='PAID' buttonStyle={styles.button} onPress={() => deleteBill(bill)} />
            }
          </View>
        </View>
      }
    </Card>
  );
};

export default BillEntry;
