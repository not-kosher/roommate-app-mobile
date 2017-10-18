import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import house from './houseReducers';
import user from './userReducers';
import notification from './notificationReducers';

const Reducers = combineReducers({
  house,
  user,
  notification,
});

export default Reducers;
