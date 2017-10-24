import React from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { View } from 'react-native';

import HouseNavBack from '../HouseNavBack';
import NotificationList from './NotificationList';

const NotificationsView = ({ notifications }) => (
  <View>
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
    }),
  },
});

export default Notifications;
