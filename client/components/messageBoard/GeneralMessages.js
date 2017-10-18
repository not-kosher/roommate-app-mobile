import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HouseNavBack from '../HouseNavBack';
import socket from '../../socket';

class GeneralMessagesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentWillMount() {
    socket.emit('joinHouse', 'testHouseId');
  }

  componentDidMount() {
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
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
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

// inject redux into props
const mapStateToProps = (store) => {
  return {
    userId: store.user.userId,
    firstName: store.user.firstName,
    lastName: store.user.lastName,
    // photoUrl:
  };
};

// inject actions into props? not here

export default GeneralMessages;
