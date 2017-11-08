import React from 'react';
import { TabNavigator } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Notifications from './Notifications';
import GeneralMessages from './GeneralMessages';
import * as color from '../../styles/common';

Notifications.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused, tintColor }) => (
    <MaterialIcons
      name={focused ? 'notifications' : 'notifications-none'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

GeneralMessages.navigationOptions = {
  tabBarLabel: 'Messages',
  tabBarIcon: ({ focused, tintColor }) => (
    <MaterialCommunityIcons
      name={focused ? 'message' : 'message-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const MessageBoardNav = TabNavigator(
  {
    // route config
    Notifications: {
      screen: Notifications,
    },
    GeneralMessages: {
      screen: GeneralMessages,
    },
  },
  {
    // navigator config
    lazy: true,
    tabBarOptions: {
      tabStyle: {
        backgroundColor: color.WHITE,
      },
      inactiveTintColor: color.TEXT_L_GRAY,
      activeTintColor: color.PRIMARY,
    },
  },
);

export default MessageBoardNav;
