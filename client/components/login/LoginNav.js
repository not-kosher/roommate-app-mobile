import { StackNavigator } from 'react-navigation';

import Splash from './Splash';
import Login from './Login';
import Signup from './Signup';

const LoginNav = StackNavigator({
  // route config
  Splash: {
    screen: Splash,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { borderBottomColor: 'white', backgroundColor: 'white' },
    }),
  },
  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => ({
      title: 'Sign Up',
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Log In',
    }),
  },
});

export default LoginNav;
