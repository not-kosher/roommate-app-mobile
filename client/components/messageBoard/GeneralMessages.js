import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import { View } from 'react-native';

import HouseNavBack from '../HouseNavBack';
import MessageList from './MessageList';

class GeneralMessagesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: ['message 1', 'message 2', 'message 3'],
    };
  }

  render() {
    return (
      <View>
        <MessageList messages={this.state.messages} />
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
