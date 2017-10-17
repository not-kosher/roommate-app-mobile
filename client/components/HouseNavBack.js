import React from 'react';
import { TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

const HouseNavBack = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('DrawerOpen')}
  >
    <Feather
      name="menu"
      size={26}
    />
  </TouchableOpacity>
);

export default HouseNavBack;
