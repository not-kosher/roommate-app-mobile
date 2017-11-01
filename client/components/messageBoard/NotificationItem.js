import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { PRIMARY, P_LIGHT } from '../../styles/common';


const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    borderColor: P_LIGHT,
    paddingBottom: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 5,
  },
  text: {
    fontSize: 16,
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
  bill: createIcon('account-balance', PRIMARY, 32),
  chore: createIcon('content-paste', PRIMARY, 32),
  'house needs': createIcon('shopping-basket', PRIMARY, 32),
  'new roomie': createIcon('person-add', PRIMARY, 32),
};


const NotificationItem = ({ notification }) => (
  <View style={styles.notificationContainer}>
    <View style={styles.iconContainer}>
      {typeToIcon[notification.type]}
    </View>

    <View
      style={styles.textContainer}
    >
      <Text style={styles.text}>{notification.text}</Text>
    </View>
  </View>
);


export default NotificationItem;
