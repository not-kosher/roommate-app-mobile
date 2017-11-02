import React from 'react';
import {
  ScrollView,
} from 'react-native';

import RoomieEntry from './RoomieEntry';

const RoomieList = (props) => {
  return (
    <ScrollView>
      {props.roomies.map(roomie => <RoomieEntry key={roomie.id} roomie={roomie} />)}
    </ScrollView>
  );
};

export default RoomieList;
