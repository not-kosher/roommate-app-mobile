import React from 'react';
import { StackNavigator } from 'react-navigation';

import Profile from './Profile';
import HouseNavBack from '../HouseNavBack';

const ProfileNav = StackNavigator(
  {
    // route config
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        title: 'My Profile',
        headerLeft: <HouseNavBack navigation={navigation} />,
      }),
    },
  },
  {
    // navigator config
  },
);

export default ProfileNav;
