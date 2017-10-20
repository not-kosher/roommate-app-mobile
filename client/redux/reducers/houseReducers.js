const initialState = {
  id: 0, // here because of db, only reference user's houseId
  name: '',
  key: '',
};

const houseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_HOUSE':
      return { ...state, ...action.payload };

    default: {
      return state;
    }
  }
};

export default houseReducer;
