import { StackNavigator } from 'react-navigation';

import * as color from '../../styles/common';
import Splash from './Splash';
import Login from './Login';
import Signup from './Signup';

const LoginNav = StackNavigator({
  Splash: {
    screen: Splash,
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
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: { borderBottomColor: color.PRIMARY, backgroundColor: color.PRIMARY },
    headerBackTitleStyle: { color: color.WHITE },
    headerTitleStyle: { color: color.WHITE },
    headerTintColor: color.WHITE,
  }),
});

export default LoginNav;
