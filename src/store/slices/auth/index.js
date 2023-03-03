import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import user from './userSlice';


const authReducers = combineReducers({
  login,
  user,
});

export default authReducers;