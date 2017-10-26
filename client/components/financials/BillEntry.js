import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const BillEntry = ({ bill, deleteBill }) => {
  return (
    <View>
      {bill !== undefined && 
        <View>
          <Text>    </Text>
          <Text>{bill.text}</Text>
          <Text>{`Poster: ${bill.posterName}`}</Text>
          <Text>{`Total: ${bill.total}`}</Text>
          <Text>{`Due Date: ${bill.dueDate}`}</Text>
          <TouchableOpacity onPress={() => deleteBill(bill)}>
            <Text>Mark As Paid</Text>
          </TouchableOpacity>
        </View>    
      }
      {/* <Text>{bill.text}</Text>
      <Text>{bill.text}</Text> */}
    </View>
  );
};

export default BillEntry;
