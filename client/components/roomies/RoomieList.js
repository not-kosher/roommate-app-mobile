import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
} from 'react-native';

import RoomieEntry from './RoomieEntry';

const RoomieList = (props) => {
  return (
    <ScrollView>
      {props.roomies.map((roomie) => {
        if (roomie.username !== props.username) {
          return (<RoomieEntry key={roomie.id} roomie={roomie} />);
        }
        return null;
      })}
    </ScrollView>
  );
};

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
  };
};

export default connect(mapStateToProps)(RoomieList);
