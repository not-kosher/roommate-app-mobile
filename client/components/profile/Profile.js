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
import { formatPhoneNumber } from '../../lib/utils';
import { resetUser } from '../../redux/actions/userActions';
import { resetHouse } from '../../redux/actions/houseActions';
import { resetMessages } from '../../redux/actions/messageActions';
import { resetNotifications } from '../../redux/actions/notificationActions';
import * as color from '../../styles/common';
import socket from '../../socket';

const styles = {
  profileContainer: {
    flex: 1,
    backgroundColor: color.BG_L_GRAY,
  },
  avatar: {
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  infoCard: {
    flex: 1,
  },
  cardOuter: {
    flex: 1,
  },
  cardInner: {
    flex: 1,
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
  },
  infoCol1: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
  },
  infoCol2: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  category: {
    color: color.TEXT_L_GRAY,
  },
  info: {
    color: color.TEXT_D_GRAY,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
};

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
      this.props.resetNotificatiions();
      this.props.resetMessages();
    });
  }

  render() {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
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
        <View style={styles.infoCard}>
          <Card containerStyle={styles.cardOuter} wrapperStyle={styles.cardInner}>
            <View style={styles.infoRow}>
              <View style={styles.infoCol1}>
                <Text style={styles.category}>Name</Text>
              </View>
              <View style={styles.infoCol2}>
                <Text style={styles.info}>{`${this.props.firstName} ${this.props.lastName}`}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoCol1}>
                <Text style={styles.category}>Email</Text>
              </View>
              <View style={styles.infoCol2}>
                <Text style={styles.info}>{this.props.username}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoCol1}>
                <Text style={styles.category}>Phone</Text>
              </View>
              <View style={styles.infoCol2}>
                <Text style={styles.info}>{formatPhoneNumber(this.props.phone)}</Text>
              </View>
            </View>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Log Out"
            onPress={this.handleLogout}
            backgroundColor={color.PRIMARY}
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
  resetMessages: () => {
    dispatch(resetMessages());
  },
  resetNotificatiions: () => {
    dispatch(resetNotifications());
  },
});

export default connect(mapStoreToProps, mapDispatchToProps)(Profile);
