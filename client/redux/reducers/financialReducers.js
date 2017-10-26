const initialState = {
  bills: [],
  charges: [],
  formattedCharges: [],
};

const financialReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BILLS':
      return { ...state, ...action.payload };

    case 'ADD_BILL':
      return { ...state, ...{ bills: state.bills.concat(action.payload) } };

    case 'DELETE_BILL':
      return { ...state, ...{ bills: (state.bills.filter(({ id }) => id !== action.payload.id)) } };

    case 'UPDATE_CHARGES':
      return { ...state, ...action.payload };

    case 'UPDATE_FORMATTED_CHARGES':
      return { ...state, ...{ formattedCharges: action.payload } };

    case 'ADD_CHARGE':
      return { ...state, ...{ charges: (state.charges.concat(action.payload)) } };

    case 'DELETE_ALL_CHARGES_FOR_BILL':
      return { ...state, ...{ charges: (state.charges.filter(({ billId }) => billId !== action.payload)) } };

    default: {
      return state;
    }
  }
};

export default financialReducer;
