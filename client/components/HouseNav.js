import React from 'react';

import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as color from '../styles/common';
import MessageBoardNav from './messageBoard/MessageBoardNav';
import FinancialsNav from './financials/FinancialsNav';
import RoomiesNav from './roomies/RoomiesNav';
import ProfileNav from './profile/ProfileNav';
import TasksNav from './tasks/TasksNav';

// custom drawer items container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BG_D_GRAY,
  },
  label: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});

const createIcon = (name, clr) => (
  <MaterialIcons
    name={name}
    color={clr}
    size={25}
  />
);

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
        drawerLabel: 'Message Board',
        drawerIcon: ({ tintColor }) => createIcon('message', tintColor),
      },
    },
    TasksNav: {
      screen: TasksNav,
      navigationOptions: {
        drawerLabel: 'Chores',
        drawerIcon: ({ tintColor }) => createIcon('content-paste', tintColor),
      },
    },
    FinancialsNav: {
      screen: FinancialsNav,
      navigationOptions: {
        drawerLabel: 'Financials',
        drawerIcon: ({ tintColor }) => createIcon('account-balance', tintColor),
      },
    },
    RoomiesNav: {
      screen: RoomiesNav,
      navigationOptions: {
        drawerLabel: 'Roomies',
        drawerIcon: ({ tintColor }) => createIcon('people-outline', tintColor),
      },
    },
    ProfileNav: {
      screen: ProfileNav,
      navigationOptions: {
        drawerLabel: 'Profile',
        drawerIcon: ({ tintColor }) => createIcon('account-circle', tintColor),
      },
    },
  },
  {
    // drawer config
    // initialRouteName: 'ProfileNav',

    // drawerWidth:
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: color.PRIMARY,
      activeBackgroundColor: color.TEXT_M_GRAY,
      inactiveTintColor: color.WHITE,
      labelStyle: styles.label,
    },
  },
);

export default HouseNav;
