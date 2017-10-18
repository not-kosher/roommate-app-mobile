const initialState = {
  username: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERNAME':
      return { ...state, username: action.username };

    default: {
      return state;
    }
  }
};

export default userReducer;
