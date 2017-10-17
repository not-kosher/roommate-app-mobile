const initialState = {
  houseId: '',
};

const houseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_HOUSE_ID':
      return { ...state, houseId: action.payload };

    default: {
      return state;
    }
  }
};

export default houseReducer;
