const initialState = {
  username: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERNAME':
      return { ...state, username: action.payload };

    default:
      return console.log('FAILED: No user reducer found');
  }
};

export default userReducer;
