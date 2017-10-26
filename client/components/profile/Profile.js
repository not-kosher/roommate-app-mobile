import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { logout } from '../../lib/authHelper';
import { resetUser } from '../../redux/actions/userActions';
import { resetHouse } from '../../redux/actions/houseActions';
import socket from '../../socket';

class Profile extends Component {
  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    logout(() => {
      socket.emit('leaveHouse', this.props.houseId);
      socket.off('newNotification');
      socket.off('newChatMessage');
      this.props.resetHouse();
      this.props.resetUser();
    });
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <TouchableOpacity onPress={this.handleLogout}>
          <View>
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStoreToProps = store => ({
  houseId: store.house.id,
});

const mapDispatchToProps = dispatch => ({
  resetUser: () => {
    dispatch(resetUser());
  },
  resetHouse: () => {
    dispatch(resetHouse());
  },
});

export default connect(mapStoreToProps, mapDispatchToProps)(Profile);
