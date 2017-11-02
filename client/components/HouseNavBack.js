import React from 'react';
import { TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

const HouseNavBack = ({ navigation }) => (
  <TouchableOpacity
    style={{ marginLeft: 5 }}
    onPress={() => navigation.navigate('DrawerOpen')}
  >
    <Feather
      name="menu"
      size={26}
      color="#ffffff"
    />
  </TouchableOpacity>
);

export default HouseNavBack;
