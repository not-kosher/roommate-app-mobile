import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import houseReducer from './houseReducers';
import userReducer from './userReducers';
import notificationReducer from './notificationReducers';

const Reducers = combineReducers({
  houseReducer,
  userReducer,
  notificationReducer,
  form: formReducer,
});

export default Reducers;
