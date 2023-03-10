import { combineReducers } from '@reduxjs/toolkit';

import rankings from './rankingsSlice';


const rankingsReducers = combineReducers({
  rankings,
});

export default rankingsReducers;