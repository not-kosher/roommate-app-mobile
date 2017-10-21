import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';

import HouseNavBack from '../HouseNavBack';
import socket from '../../socket';
// import axios from '../../lib/customAxios';

class GeneralMessagesView extends Component {
  constructor(props) {
    super(props);
    console.log(`props in the general messages: ${props}`);

    this.state = {
      messages: [],
    };
  }

  componentWillMount() {
    // these should be when they enter, here for now
    socket.emit('joinHouse', 2);

    // axios.get('/api/messages')
    //   .then((messages) => {
    //     console.log(`messages from db: ${messages}`);
    //     // need to reformat for gifted...

    //     // need to save giftedId in db?
    //     // need to build user obj by looking at the house store?

    //     const giftedMessages = messages.map((message) => {
    //       let user;
    //       this.props.roomies.forEach((roomie) => {
    //         if (roomie.id === message.userId) {
    //           user = {
    //             _id: roomie.id,
    //             name: roomie.firstName,
    //             avatar: roomie.imageUrl,
    //           };
    //         }
    //       });

    //       return {
    //         _id: message.giftedId,
    //         text: message.text,
    //         createdAt: message.createdAt,
    //         user,
    //       };
    //     });
    //   })
    //   .catch(err => console.log(`FAILED to get messages from db: ${err}`));

    socket.on('newChatMessage', (messages) => {
      console.log(`received new message: ${messages[0]}`);
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
    });

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    console.log(`sending message: ${messages[0]}`);
    socket.emit('addChatMessage', 2, messages);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          name: 'Tyler',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        }}
      />
    );
  }
}

const mapStateToProps = store => ({
  userId: store.user.id,
  firstName: store.user.firstName,
  lastName: store.user.lastName,
  imageUrl: store.user.imageUrl,
  houseId: store.house.id,
  roomies: store.house.roomies,
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
