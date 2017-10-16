import { StackNavigator } from 'react-navigation';

import Login from './Login';

const LoginNav = StackNavigator(
  {
    // route config
    Login: { screen: Login },
  },
  {
    // navigator config
  },
);

export default LoginNav;
