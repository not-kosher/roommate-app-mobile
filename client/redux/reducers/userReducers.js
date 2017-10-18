const initialState = {
  username: '',
  userId: 0,
  imageUrl: '',
  firstName: '',
  lastName: '',
  phone: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERNAME':
      return { ...state, username: action.username };

    case 'UPDATE_USER':
      return { ...state, ...action.user };

    default: {
      return state;
    }
  }
};

export default userReducer;
