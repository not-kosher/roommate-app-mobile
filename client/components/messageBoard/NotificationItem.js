import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { TEXT_L_GRAY, TEXT_D_GRAY, DIV_GRAY } from '../../styles/common';


const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    borderColor: DIV_GRAY,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 8,
    paddingTop: 8,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginLeft: 5,
    flexDirection: 'row',
  },
  usernameText: {
    fontSize: 14,
    color: TEXT_D_GRAY,
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
    color: TEXT_D_GRAY,
  },
});

const createIcon = (name, color, size) => (
  <MaterialIcons
    name={name}
    color={color}
    size={size}
  />
);

const typeToIcon = {
  bill: createIcon('account-balance', TEXT_L_GRAY, 32),
  chore: createIcon('content-paste', TEXT_L_GRAY, 32),
  'house needs': createIcon('shopping-basket', TEXT_L_GRAY, 32),
  'new roomie': createIcon('person-add', TEXT_L_GRAY, 32),
};


const NotificationItem = ({ notification }) => (
  <View style={styles.notificationContainer}>
    <View style={styles.iconContainer}>
      {typeToIcon[notification.type]}
    </View>

    <View
      style={styles.textContainer}
    >
      <Text style={styles.usernameText}>{notification.username}</Text>
      <Text style={styles.text}>{` ${notification.text}`}</Text>
    </View>
  </View>
);


export default NotificationItem;
