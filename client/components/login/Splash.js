import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const Splash = props => (
  <View>
    <Text>LOGO!!!</Text>
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Signup')}
    >
      <View>
        <Text>Sign up</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Login')}
    >
      <View>
        <Text>Log In</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default Splash;
