import React from 'react';
import { StackNavigator } from 'react-navigation';

import {
  View,
  Text,
} from 'react-native';

import HouseNavBack from '../HouseNavBack';

const NotificationsView = () => (
  <View>
    <Text>Notifications</Text>
  </View>
);

// make Notifications into stack for title bar
const Notifications = StackNavigator({
  Notifications: {
    screen: NotificationsView,
    navigationOptions: ({ navigation }) => ({
      title: 'Notifications',
      headerLeft: <HouseNavBack navigation={navigation} />,
    }),
  },
});

export default Notifications;
