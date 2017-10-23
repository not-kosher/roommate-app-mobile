import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';

import HouseNavBack from '../HouseNavBack';
import socket from '../../socket';
import axios from '../../lib/customAxios';

class GeneralMessagesView extends Component {
  constructor(props) {
    super(props);
    console.log(`props in the general messages: ${props}`);

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    // this should be when they enter, here for now
    socket.emit('joinHouse', this.props.houseId);

    axios.get(`/api/messages/${this.props.houseId}`)
      .then((messages) => {
        // convert messages to gifted chat format
        const giftedMessages = messages.data.map((message) => {
          let user;
          this.props.roomies.forEach((roomie) => {
            if (roomie.id === message.userId) {
              user = {
                _id: roomie.id,
                name: roomie.firstName,
                avatar: roomie.imageUrl,
              };
            }
          });

          return {
            _id: message.giftedId,
            text: message.text,
            createdAt: message.createdAt,
            user,
          };
        });

        this.setState({
          messages: giftedMessages,
        });
      })
      .catch(err => console.log(`FAILED to get messages from db: ${err}`));

    socket.on('newChatMessage', (messages) => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
    });
  }

  onSend(messages = []) {
    socket.emit('addChatMessage', this.props.houseId, messages);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.userId,
          name: this.props.firstName,
          avatar: this.props.imageUrl,
        }}
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
  roomies: state.house.roomies,
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
