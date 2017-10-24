import { StackNavigator } from 'react-navigation';

import Splash from './Splash';
import Login from './Login';
import Signup from './Signup';

const LoginNav = StackNavigator({
  // route config
  Splash: {
    screen: Splash,
  },
  Signup: {
    screen: Signup,
  },
  Login: {
    screen: Login,
  },
});

export default LoginNav;
