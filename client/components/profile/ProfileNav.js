import React from 'react';
import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import * as color from '../../styles/common';
import HouseNavBack from '../HouseNavBack';
import Profile from './Profile';
import EditProfile from './EditProfile';

const ProfileNav = StackNavigator(
  {
    // route config
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        title: 'My Profile',
        headerLeft: <HouseNavBack navigation={navigation} />,
        headerRight: <Button
          title="Edit"
          color={color.WHITE}
          onPress={() => navigation.navigate('EditProfile')}
        />,
      }),
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: ({ navigation }) => ({
        title: 'Edit Profile',
      }),
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: { borderBottomColor: color.PRIMARY, backgroundColor: color.PRIMARY },
      headerTitleStyle: { color: color.WHITE },
      headerTintColor: color.WHITE,
    }),
  },
);

export default ProfileNav;
