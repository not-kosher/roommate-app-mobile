import { StackNavigator } from 'react-navigation';

import Login from './Login';
import Signup from './Signup';
import EditProfile from '../profile/EditProfile';
import HouseEntry from './HouseEntry';

const LoginNav = StackNavigator(
  {
    // route config
    Signup: {
      screen: Signup,
    },
    Login: {
      screen: Login,
    },
    EditProfile: {
      screen: EditProfile,
    },
    HouseEntry: {
      screen: HouseEntry,
    },
  },
  {
    // navigator config
    initialRouteName: 'HouseEntry',
  },
);

export default LoginNav;
