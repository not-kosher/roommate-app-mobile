const initialState = {
  username: '',
  id: 0,
  houseId: 0,
  imageUrl: '',
  firstName: '',
  lastName: '',
  phone: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER': {
      return { ...state, ...action.payload };
    }

    case 'RESET_USER':
      return { ...state, ...initialState };

    default: {
      return state;
    }
  }
};

export default userReducer;
