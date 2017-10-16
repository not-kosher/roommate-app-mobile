import React from 'react';
import { StackNavigator } from 'react-navigation';

import {
  View,
  Text,
} from 'react-native';

const NotificationsView = () => (
  <View>
    <Text>Notifications</Text>
  </View>
);

// make Notifications into stack for title bar
const Notifications = StackNavigator({
  Notifications: { screen: NotificationsView },
});

export default Notifications;
