import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import NotificationItem from './NotificationItem';

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 5,
  },
});

const NotificationList = ({ notifications }) => (
  <ScrollView style={styles.scrollView}>
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
