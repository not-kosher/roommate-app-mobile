import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import HouseNavBack from '../HouseNavBack';
import socket from '../../socket';
import { PRIMARY } from '../../styles/common';

class GeneralMessagesView extends Component {
  onSend(messages = []) {
    socket.emit('addChatMessage', this.props.houseId, messages);
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
          right: {
            backgroundColor: PRIMARY,
          },
        }}
      />
    );
  }

  // create component, import
  // have that component take in props and log those to see what's there
  // have that display the first name of the person

  // renderCustomView(props) {
  //   return (
  //     <CustomView
  //       {...props}
  //     />
  //   );
  // }

  render() {
    return (
      <GiftedChat
        messages={this.props.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.userId,
          name: this.props.firstName,
          avatar: this.props.imageUrl,
        }}
        renderBubble={this.renderBubble}
      />
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  imageUrl: state.user.imageUrl,
  houseId: state.house.id,
  messages: state.message.messages,
});

const GeneralMessagesRedux = connect(mapStateToProps, null)(GeneralMessagesView);

// turning this into a stack naviagtor so can have a matching header with
// the rest of the application
const GeneralMessages = StackNavigator({
  GeneralMessages: {
    screen: GeneralMessagesRedux,
    navigationOptions: ({ navigation }) => ({
      title: 'Messages',
      headerLeft: <HouseNavBack navigation={navigation} />,
    }),
  },
});

export default GeneralMessages;
