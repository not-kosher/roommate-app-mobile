import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'react-native';
import {
  Avatar,
  Card,
  Button,
} from 'react-native-elements';

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
        <View>
          {this.props.imageUrl ?
            <Avatar
              xlarge
              rounded
              source={{ uri: this.props.imageUrl }}
            />
            :
            <Avatar
              xlarge
              rounded
              title={`${this.props.firstName[0]}${this.props.lastName[0]}`}
            />
          }
        </View>
        <View>
          <Card>
            <Text>{this.props.firstName}{this.props.lastName}</Text>
          </Card>
        </View>
        <View>
          <Button
            large
            title="Log Out"
            onPress={this.handleLogout}
          />
        </View>
      </View>
    );
  }
}

const mapStoreToProps = store => ({
  houseId: store.house.id,
  username: store.user.username,
  imageUrl: store.user.imageUrl,
  firstName: store.user.firstName,
  lastName: store.user.lastName,
  phone: store.user.phone,
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
