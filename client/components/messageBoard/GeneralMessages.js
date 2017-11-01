import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, Avatar, Send } from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HouseNavBack from '../HouseNavBack';
import socket from '../../socket';
import { PRIMARY } from '../../styles/common';
import MessageView from './MessageView';

const styles = StyleSheet.create({
  sendButton: {
    marginRight: 8,
    marginBottom: 3,
    marginLeft: 5,
  },
});

class GeneralMessagesView extends Component {
  onSend(messages = []) {
    socket.emit('addChatMessage', this.props.houseId, messages);
  }

  renderAvatar(props) {
    return (
      <Avatar
        {...props}
      />
    );
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

  renderMessageView(props) {
    return (
      <MessageView
        {...props}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View>
          <FontAwesome
            style={styles.sendButton}
            name="send"
            color={PRIMARY}
            size={35}
          />
        </View>
      </Send>
    );
  }

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
        renderAvatar={this.renderAvatar}
        renderBubble={this.renderBubble}
        renderMessage={this.renderMessageView}
        renderSend={this.renderSend}
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
