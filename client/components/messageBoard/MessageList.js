import React from 'react';
import { View, Text } from 'react-native';

import Message from './Message';

const MessageList = ({ messages }) => (
  <View>
    <Text>MessageList</Text>
    {
      messages.map(message => (
        <Message message={message} />
      ))
    }
  </View>
);

export default MessageList;
