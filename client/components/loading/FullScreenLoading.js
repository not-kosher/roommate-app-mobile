import React from 'react';
import { PulseIndicator } from 'react-native-indicators';
import { View, StyleSheet } from 'react-native';
import { PRIMARY, WHITE } from '../../styles/common';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: PRIMARY,
  },
  indicator: {
    flex: 1,
  },
});

const FullScreenLoading = () => (
  <View style={styles.page}>
    <PulseIndicator
      style={styles.indicator}
      size={80}
      color={WHITE}
    />
  </View>
);

export default FullScreenLoading;
