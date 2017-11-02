import React from 'react';
import { MaterialIndicator } from 'react-native-indicators';
import { View, StyleSheet } from 'react-native';
import { WHITE } from '../../styles/common';

const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#dddddd',
    flex: 1,
  },
});

const TintedLoading = () => (
  <View style={styles.loading}>
    <MaterialIndicator color={WHITE} />
  </View>
);

export default TintedLoading;
