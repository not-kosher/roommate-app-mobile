import React from 'react';
import { TabNavigator } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Notifications from './Notifications';
import GeneralMessages from './GeneralMessages';

Notifications.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ tintColor, focused }) => (
    <MaterialIcons
      name={focused ? 'notifications' : 'notifications-none'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

GeneralMessages.navigationOptions = {
  tabBarLabel: 'Messages',
  tabBarIcon: ({ tintColor, focused }) => (
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
    Notifications: { screen: Notifications },
    GeneralMessages: { screen: GeneralMessages },
  },
  {
    // navigator config
  },
);

export default MessageBoardNav;
