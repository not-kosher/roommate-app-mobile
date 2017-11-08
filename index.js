import React from 'react';
import { AppRegistry } from 'react-native';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger as logger } from 'redux-logger';
import promise from 'redux-promise-middleware';

import App from './client/components/App';
import Reducers from './client/redux/reducers';

// Initialize middleware for redux
const loggerMiddleware = logger();
const middleware = applyMiddleware(promise(), thunk, loggerMiddleware);

// Initialize redux state with (reducers, middleware)
const store = createStore(Reducers, middleware);

const RoommateAppMobile = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RoommateAppMobile;

AppRegistry.registerComponent('RoommateAppMobile', () => RoommateAppMobile);
