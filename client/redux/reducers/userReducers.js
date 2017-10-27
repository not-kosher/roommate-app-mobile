const initialState = {
  username: '',
  id: 0,
  houseId: 0,
  imageUrl: '',
  firstName: '',
  lastName: '',
  phone: '',
  isConnectedToSocket: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER': {
      return { ...state, ...action.payload };
    }

    case 'RESET_USER':
      return { ...state, ...initialState };

    case 'UPDATE_SOCKET_STATUS':
      return { ...state, isConnectedToSocket: action.payload };

    default: {
      return state;
    }
  }
};

export default userReducer;
