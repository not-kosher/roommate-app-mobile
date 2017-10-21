import React from 'react';
import {
  View,
} from 'react-native';

import RoomieEntry from './RoomieEntry';

const RoomieList = (props) => {
  return (
    <View>
      {props.roomies.map(roomie => <RoomieEntry key={roomie.id} roomie={roomie} />)}
    </View>
  );
};

export default RoomieList;
