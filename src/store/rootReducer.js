import { combineReducers } from '@reduxjs/toolkit';
import auth from './slices/auth';
// imports other reducers here


const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducers = combineReducers({
    auth,
    ...asyncReducers,
  });

  // Resets redux store in case the user is logged out
  if (action.type === 'auth/user/userLoggedOut'){
    state = undefined;
  }
  return combinedReducers(state, action);
}

export default createReducer;