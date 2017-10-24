const initialState = {
  messages: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGES_RECEIVED':
      return { ...state, messages: action.payload };

    case 'ADD_MESSAGE':
      return { ...state, messages: state.messages.push(action.payload) };

    default: {
      return state;
    }
  }
};

export default messageReducer;
