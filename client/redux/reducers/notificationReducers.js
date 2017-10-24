const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_RECEIVED':
      return { ...state, notifications: action.payload };

    case 'ADD_NOTIFICATION':
      return { ...state, notifications: state.notifications.unshift(action.payload) };

    default: {
      return state;
    }
  }
};

export default notificationReducer;
