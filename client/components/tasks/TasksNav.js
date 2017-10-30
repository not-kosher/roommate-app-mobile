import React from 'react';
import { TabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Chores from './Chores';
import HouseNeeds from './HouseNeeds';

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
);

export default TasksNav;
