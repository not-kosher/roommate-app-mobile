import React from 'react';
import { View, Text } from 'react-native';

const NotificationItem = ({ notification }) => (
  <View>
    <Text>{notification.text}</Text>
    <Text>{notification.type}</Text>
  </View>
);

export default NotificationItem;
