import { GiftedChat } from 'react-native-gifted-chat';

const initialState = {
  messages: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGES_RECEIVED':
      return { ...state, messages: action.payload };

    case 'ADD_MESSAGE':
      return { ...state, messages: GiftedChat.append(state.messages, action.payload) };

    default: {
      return state;
    }
  }
};

export default messageReducer;
