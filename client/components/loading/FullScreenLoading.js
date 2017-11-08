import React from 'react';
import { PulseIndicator } from 'react-native-indicators';
import { View, Text, StyleSheet } from 'react-native';
import { PRIMARY, WHITE } from '../../styles/common';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: PRIMARY,
  },
  displayContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 7,
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  text: {
    textAlign: 'center',
    color: WHITE,
    fontSize: 20,
  },
  indicator: {
    flex: 8,
    justifyContent: 'flex-start',
  },
});

const FullScreenLoading = ({ displayBall }) => (
  <View style={styles.page}>
    {displayBall &&
      <View style={styles.displayContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Getting your house
          </Text>
        </View>
        <PulseIndicator
          style={styles.indicator}
          size={64}
          color={WHITE}
        />
      </View>
    }
  </View>
);

export default FullScreenLoading;
