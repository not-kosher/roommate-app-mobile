import { combineReducers } from 'redux';

import house from './houseReducers';
import user from './userReducers';
import notification from './notificationReducers';
import message from './messageReducers';

const Reducers = combineReducers({
  house,
  user,
  notification,
  message,
});

export default Reducers;
