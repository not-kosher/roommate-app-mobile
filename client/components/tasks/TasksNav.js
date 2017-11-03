import React from 'react';
import { TabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Chores from './Chores';
import HouseNeeds from './HouseNeeds';

import { PRIMARY } from '../../styles/common';

Chores.navigationOptions = {
  tabBarLabel: 'Chores',
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      name="content-paste"
      size={26}
      style={{ color: PRIMARY }}
    />
  ),
};

HouseNeeds.navigationOptions = {
  tabBarLabel: 'House Needs',
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      name="shopping-basket"
      size={26}
      style={{ color: PRIMARY }}
    />
  ),
};

const TasksNav = TabNavigator(
  {
    Chores: {
      screen: Chores,
    },
    HouseNeeds: {
      screen: HouseNeeds,
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        color: PRIMARY,
      },
    },
  },
);

export default TasksNav;
