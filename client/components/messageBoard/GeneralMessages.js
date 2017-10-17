import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import {
  View,
  Text,
} from 'react-native';

import HouseNavBack from '../HouseNavBack';

class GeneralMessagesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  render() {
    return (
      <View>
        <Text>General Messages</Text>
      </View>
    );
  }
}

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
