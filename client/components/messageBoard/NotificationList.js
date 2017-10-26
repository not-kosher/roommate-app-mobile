import React from 'react';
import { View } from 'react-native';

import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications }) => (
  <View>
    {
      notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
        />
      ))
    }
  </View>
);

export default NotificationList;
