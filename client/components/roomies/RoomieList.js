import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import RoomieEntry from './RoomieEntry';

const RoomieList = (props) => {
  return (
    <View>
      {props.roomies.map((roommate) => {
        return <RoomieEntry roomie={roommate} key={roommate.id} />;
      })}
      <RoomieEntry roomie={{
        username: 'rollinsno@no.com',
        firstName: 'Rollins',
        lastName: 'Cat',
        email: 'rollinsno@no.com',
        phone: '1234567891',
        houseId: 1,
      }} />
    </View>
  );
};

export default RoomieList;
