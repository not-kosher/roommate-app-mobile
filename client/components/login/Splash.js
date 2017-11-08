import React from 'react';
import {
  View,
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
    backgroundColor: color.PRIMARY,
  },
  logoContainer: {
    flex: 1.7,
  },
  logo: {
    flex: 1,
    height: null,
    width: null,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonView: {
    marginBottom: 35,
  },
};

const Splash = props => (
  <View style={styles.splashContainer}>
    <View style={styles.logoContainer}>
      <Image
        source={logo}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
    <View style={styles.buttonContainer}>
      <View style={styles.buttonView}>
        <Button
          large
          title="Sign Up"
          onPress={() => props.navigation.navigate('Signup')}
          backgroundColor={color.PRIMARY_D2}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          large
          title="Log In"
          onPress={() => props.navigation.navigate('Login')}
          backgroundColor={color.PRIMARY_D2}
        />
      </View>
    </View>
  </View>
);

export default Splash;
