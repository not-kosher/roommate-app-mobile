import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View } from 'react-native';

import HouseNavBack from '../HouseNavBack';
import NotificationList from './NotificationList';

class NotificationsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };
  }

  componentWillMount() {
    // make call to server to get notifications
  }

  render() {
    return (
      <View>
        <NotificationList notifications={this.state.notifications} />
      </View>
    );
  }
}

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
