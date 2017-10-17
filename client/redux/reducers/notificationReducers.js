const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: state.notifications.push(action.payload) };

    default: {
      return state;
    }
  }
};

export default notificationReducer;
