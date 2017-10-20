import { StackNavigator } from 'react-navigation';

import Login from './Login';
import Signup from './Signup';

const LoginNav = StackNavigator(
  {
    // route config
    Signup: {
      screen: Signup,
    },
    Login: {
      screen: Login,
    },
  });

export default LoginNav;
