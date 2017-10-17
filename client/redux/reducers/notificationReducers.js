const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: state.notifications.push(action.payload) };

    default:
      return console.log('FAILED: No notification reducer found');
  }
};

export default notificationReducer;
