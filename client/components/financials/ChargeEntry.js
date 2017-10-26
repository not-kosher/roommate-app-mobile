import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const ChargeEntry = ({ charge }) => {
  return (
    <View>
      <Text>   </Text>
      <Text>{charge[0].firstNames}</Text>
      <Text>Total:</Text>
      {charge[1] > 0 &&
        <Text style={{ color: 'red' }}>{charge[1].toFixed(2)}</Text>
      }
      {charge[1] < 0 &&
        <Text style={{ color: 'green' }}>{charge[1].toFixed(2) * -1}</Text>
      }
      {charge[1] === 0 &&
        <Text>{charge[1].toFixed(2)}</Text>
      }
      {charge[2].map((roomieOwsUsercharge) => {
        return (
          <View key={roomieOwsUsercharge.id}>
            <Text style={{ color: 'green' }}>{roomieOwsUsercharge.billText}</Text>
            <Text style={{ color: 'green' }}>{roomieOwsUsercharge.total}</Text>
          </View>
        );
      })}
      {charge[3].map((userOwesRoomieCharge) => {
        return (
          <View key={userOwesRoomieCharge.id}>
            <Text style={{ color: 'red' }}>{userOwesRoomieCharge.billText}</Text>
            <Text style={{ color: 'red' }}>{userOwesRoomieCharge.total}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ChargeEntry;
