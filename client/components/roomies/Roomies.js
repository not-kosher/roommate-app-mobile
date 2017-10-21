import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import RoomieList from './RoomieList';

const Roomies = (props) => {
  return (
    <View>
      <RoomieList roomies={props.roomies} />
      <TouchableOpacity onPress={() => props.navigation.navigate('AddRoomie')}>
        <Text>Add Roomie</Text>
      </TouchableOpacity>
    </View>
  );
};


const mapStateToProps = (store) => {
  return {
    roomies: store.house.roomies,
  };
};

export default connect(mapStateToProps)(Roomies);
