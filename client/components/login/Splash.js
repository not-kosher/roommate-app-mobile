import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Button,
} from 'react-native-elements';

import logo from '../../images/logos/landing_page.png';
import * as color from '../../styles/common';

const styles = {
  splashContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 112,
    width: 325,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonView: {
    flex: 1,
    margin: 5,
  },
};

const Splash = props => (
  <View style={styles.splashContainer}>
    <View style={styles.logoContainer}>
      <Image
        source={logo}
        style={styles.logo}
      />
    </View>
    <View style={styles.buttonContainer}>
      <View style={styles.buttonView}>
        <Button
          large
          title="Sign Up"
          onPress={() => props.navigation.navigate('Signup')}
          backgroundColor={color.PRIMARY}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          large
          title="Log In"
          onPress={() => props.navigation.navigate('Login')}
          backgroundColor={color.SECONDARY}
        />
      </View>
    </View>
  </View>
);

export default Splash;
