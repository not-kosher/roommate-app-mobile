import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications }) => (
  <ScrollView>
    {
      notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
        />
      ))
    }
  </ScrollView>
);

export default NotificationList;
