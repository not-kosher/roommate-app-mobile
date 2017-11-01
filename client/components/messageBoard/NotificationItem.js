import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
});

const typeToColor = {
  bill: '#ff0000',
  chore: '#00ff00',
  'house needs': '#ffff00',
  'new roomie': '#0000ff',
};

const typeToIcon = {
  bill: <MaterialIcons name="account-balance" />,
  chore: <MaterialIcons name="content-paste" />,
  'house needs': <MaterialIcons name="shopping-basket" />,
  'new roomie': <MaterialIcons name="person-add" />,
};


const NotificationItem = ({ notification }) => (
  <View style={styles.notificationContainer}>
    <View style={styles.iconContainer}>
      {typeToIcon[notification.type]}
    </View>

    <View
      style={styles.textContainer}
    >
      <Text>{notification.text}</Text>
    </View>
  </View>
);

// const NotificationItem = () => (
//   <View style={{flex: 1}}>
//     <Text>sdjsdnjfsjdfs</Text>
//   </View>
// );

export default NotificationItem;
