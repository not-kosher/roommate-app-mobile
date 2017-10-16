import { React } from 'react';

import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { View, StyleSheet } from 'react-native';

import MessageBoardNav from './messageBoard/MessageBoardNav';
import RoomiesNav from './roomies/RoomiesNav';
import ProfileNav from './profile/ProfileNav';

// custom drawer items container
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const DrawerContent = props => (
  <View style={styles.container}>
    <DrawerItems {...props} />
  </View>
);

const HouseNav = DrawerNavigator(
  {
    // route config
    MessageBoardNav: { screen: MessageBoardNav },
    RoomiesNav: { screen: RoomiesNav },
    ProfileNav: { screen: ProfileNav },
  },
  {
    // drawer config
    // initialRouteName:

    contentComponent: DrawerContent,
    // drawerWidth:
    // drawerBackgroundColor
  },
);

export default HouseNav;
