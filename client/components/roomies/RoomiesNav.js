import React from 'react';
import { StackNavigator } from 'react-navigation';

import Roomies from './Roomies';
import AddRoomie from './AddRoomie';
import HouseNavBack from '../HouseNavBack';

const RoomiesNav = StackNavigator(
  {
    // route config
    Roomies: {
      screen: Roomies,
      navigationOptions: ({ navigation }) => ({
        title: 'Roomies',
        headerLeft: <HouseNavBack navigation={navigation} />,
      }),
    },
    AddRoomie: { screen: AddRoomie },
  },
  {
    // navigator config
  },
);

export default RoomiesNav;
