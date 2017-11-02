import React from 'react';
import { StackNavigator } from 'react-navigation';

import * as color from '../../styles/common';
import Roomies from './Roomies';
import AddRoomie from './AddRoomie';
import HouseNavBack from '../HouseNavBack';

const RoomiesNav = StackNavigator(
  {
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
    navigationOptions: ({ navigation }) => ({
      headerStyle: { borderBottomColor: color.PRIMARY, backgroundColor: color.PRIMARY },
      headerBackTitleStyle: { color: color.WHITE },
      headerTitleStyle: { color: color.WHITE },
      headerTintColor: color.WHITE,
    }),
  },
);

export default RoomiesNav;
