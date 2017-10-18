import React from 'react';
import { Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

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
        headerRight: <Button title="Edit" onPress={() => navigation.navigate('EditProfile')} />,
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
    // navigator config
  },
);

export default ProfileNav;
