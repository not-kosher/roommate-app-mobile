import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const RoomieEntry = ({ roomie }) => {
  return (
    <View>
      <Text>{`${roomie.firstName} ${roomie.lastName}`}</Text>
      <Text>{`Email: ${roomie.username}`}</Text>
      {roomie.phone && 
        <Text>
          {`Phone: (${roomie.phone.slice(0, 3)})-${roomie.phone.slice(3, 6)}-${roomie.phone.slice(6, 10)}`}
        </Text>
      }
    </View>
  );
};

export default RoomieEntry;
