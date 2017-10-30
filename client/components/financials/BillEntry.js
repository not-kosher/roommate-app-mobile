import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Card, Button } from 'react-native-elements'; 

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

const styles = {
  billEntryContainer: {
    flex: 1,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 2.5,
    marginBottom: 2.5,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
  },
  billEntry: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  billTotalText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  billHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
};

const BillEntry = ({ bill, deleteBill }) => {
  return (
    <Card containerStyle={{ margin: 6, padding: 10 }}>
      {bill !== undefined &&
        <View style={styles.billEntry}>
          <View style={styles.billDetails}>
            <Text style={styles.billHeader}>{bill.text}</Text>
            <Text>{`Poster: ${bill.userName}`}</Text>
            <Text>{`Due Date: ${numbersToMonths[bill.dueDate.slice(5, 7)]} ${bill.dueDate.slice(8, 10)}`}</Text>
          </View>
          <View style={styles.billTotal}>
            <Text style={styles.billTotalText}>{`$${bill.total}`}</Text>
            <Button title='PAID' buttonStyle={{ padding: 5, height: 20, marginTop: 5, backgroundColor: '#47a398', borderRadius: 8 }} onPress={() => deleteBill(bill)} />
          </View>
        </View>
      }
    </Card>
  );
};

export default BillEntry;
