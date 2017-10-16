import { StackNavigator } from 'react-navigation';

import Profile from './Profile';

const ProfileNav = StackNavigator(
  {
    // route config
    Profile: { screen: Profile },
  },
  {
    // navigator config
  },
);

export default ProfileNav;
