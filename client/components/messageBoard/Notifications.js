import React from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import HouseNavBack from '../HouseNavBack';
import NotificationList from './NotificationList';
import { PRIMARY } from '../../styles/common';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
});

const NotificationsView = ({ notifications }) => (
  <View style={styles.viewContainer}>
    <NotificationList notifications={notifications} />
  </View>
);

const mapStateToProps = state => ({
  notifications: state.notification.notifications,
});

const NotificationsRedux = connect(mapStateToProps, null)(NotificationsView);

// make Notifications into stack for title bar
const Notifications = StackNavigator({
  Notifications: {
    screen: NotificationsRedux,
    navigationOptions: ({ navigation }) => ({
      title: 'Notifications',
      headerLeft: <HouseNavBack navigation={navigation} />,
      headerStyle: {
        backgroundColor: PRIMARY,
      },
      headerTitleStyle: {
        color: '#ffffff',
      },
    }),
  },
});

export default Notifications;
