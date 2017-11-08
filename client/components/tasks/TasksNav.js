import React from 'react';
import { TabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Chores from './Chores';
import HouseNeeds from './HouseNeeds';

import * as color from '../../styles/common';

Chores.navigationOptions = {
  tabBarLabel: 'Chores',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons
      name="content-paste"
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

HouseNeeds.navigationOptions = {
  tabBarLabel: 'House Needs',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons
      name="shopping-basket"
      size={26}
      style={{ color: tintColor }}
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
      tabStyle: {
        backgroundColor: color.WHITE,
      },
      inactiveTintColor: color.TEXT_L_GRAY,
      activeTintColor: color.PRIMARY,
    },
  },
);

export default TasksNav;
