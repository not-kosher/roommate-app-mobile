import React from 'react';
import { PulseIndicator } from 'react-native-indicators';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    paddingTop: 290,
  },
  indicator: {
    flex: 1,
    paddingBottom: 290,
  },
});

const FullScreenLoading = () => (
  <View style={styles.page}>
    <Text style={styles.loadingText}>
      Abode
    </Text>
    <PulseIndicator style={styles.indicator} />
  </View>
);

export default FullScreenLoading;
