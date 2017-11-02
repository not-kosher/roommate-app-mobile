import React from 'react';

import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { View, StyleSheet } from 'react-native';

import MessageBoardNav from './messageBoard/MessageBoardNav';
import FinancialsNav from './financials/FinancialsNav';
import RoomiesNav from './roomies/RoomiesNav';
import ProfileNav from './profile/ProfileNav';
import TasksNav from './tasks/TasksNav';

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
    MessageBoardNav: {
      screen: MessageBoardNav,
      navigationOptions: {
        title: 'Message Board',
      },
    },
    FinancialsNav: { screen: FinancialsNav },
    RoomiesNav: { screen: RoomiesNav },
    ProfileNav: { screen: ProfileNav },
    TasksNav: { screen: TasksNav },
  },
  {
    // drawer config
    // initialRouteName: 'ProfileNav',

    // drawerWidth:
    contentComponent: DrawerContent,
  },
);

export default HouseNav;
