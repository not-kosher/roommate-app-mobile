const initialState = {
  username: '',
  id: 0,
  houseId: 0,
  imageUrl: 'https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg',
  firstName: '',
  lastName: '',
  phone: '',
  isConnectedToSocket: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER': {
      if (!action.payload.imageUrl) {
        action.payload.imageUrl = initialState.imageUrl;
      }
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
