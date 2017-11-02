import React from 'react';
import { TabNavigator } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Notifications from './Notifications';
import GeneralMessages from './GeneralMessages';
import { PRIMARY } from '../../styles/common';

Notifications.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      name={focused ? 'notifications' : 'notifications-none'}
      size={26}
      style={{ color: PRIMARY }}
    />
  ),
};

GeneralMessages.navigationOptions = {
  tabBarLabel: 'Messages',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name={focused ? 'message' : 'message-outline'}
      size={26}
      style={{ color: PRIMARY }}
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
      labelStyle: {
        color: PRIMARY,
      },
    },
  },
);

export default MessageBoardNav;
