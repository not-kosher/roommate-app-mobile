import React from 'react';
import { MaterialIndicator } from 'react-native-indicators';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#00000022',
    flex: 1,
  },
});

const TintedLoading = () => (
  <View style={styles.loading}>
    <MaterialIndicator color="#ffffff" />
  </View>
);

export default TintedLoading;
