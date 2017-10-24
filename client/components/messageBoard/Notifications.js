import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { View } from 'react-native';

import HouseNavBack from '../HouseNavBack';
import NotificationList from './NotificationList';
// import axios from '../../lib/customAxios';
// import socket from '../../socket';

class NotificationsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };
  }

  componentWillMount() {
    // axios.get(`api/notifications/${this.props.houseId}`)
    //   .then(notifications => this.setState({ notifications: notifications.data }))
    //   .catch(err => `FAILED to get notifications: ${err}`);

    // test emit
    // shoudl be one object...
    // setTimeout(() => {
    //   const testNotification = {
    //     houseId: this.props.houseId,
    //     userId: this.props.userId,
    //     type: 'bill',
    //     text: 'eat me',
    //   };
    //   socket.emit('addNotification', testNotification);
    // }, 5000);

    // listen and update redux store
    // socket.on('newNotification', (notification) => {
    //   console.log(`notification from socket: ${notification}`);
    // });
  }

  render() {
    return (
      <View>
        <NotificationList notifications={this.state.notifications} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  houseId: state.house.id,
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
