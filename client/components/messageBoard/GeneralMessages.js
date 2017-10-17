import React from 'react';
import { StackNavigator } from 'react-navigation';

import {
  View,
  Text,
} from 'react-native';

import HouseNavBack from '../HouseNavBack';

const GeneralMessagesView = () => (
  <View>
    <Text>GeneralMessages</Text>
  </View>
);

const GeneralMessages = StackNavigator({
  GeneralMessages: {
    screen: GeneralMessagesView,
    navigationOptions: ({ navigation }) => ({
      title: 'Messages',
      headerLeft: <HouseNavBack navigation={navigation} />,
    }),
  },
});

export default GeneralMessages;
