import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { TEXT_L_GRAY, TEXT_D_GRAY, DIV_GRAY } from '../../styles/common';


const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    borderColor: DIV_GRAY,
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
      <Text style={styles.text}>{notification.text}</Text>
    </View>
  </View>
);


export default NotificationItem;
