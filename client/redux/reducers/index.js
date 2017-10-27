import { combineReducers } from 'redux';

import house from './houseReducers';
import user from './userReducers';
import notification from './notificationReducers';
import message from './messageReducers';
import financial from './financialReducers';

const Reducers = combineReducers({
  house,
  user,
  notification,
  message,
  financial,
});

export default Reducers;
