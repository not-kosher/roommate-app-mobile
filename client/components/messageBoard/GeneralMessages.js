import React from 'react';
import { StackNavigator } from 'react-navigation';

import {
  View,
  Text,
} from 'react-native';

const GeneralMessagesView = () => (
  <View>
    <Text>GeneralMessages</Text>
  </View>
);

const GeneralMessages = StackNavigator({
  GeneralMessages: { screen: GeneralMessagesView },
});

export default GeneralMessages;
