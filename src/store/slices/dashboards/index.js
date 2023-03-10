import { combineReducers } from '@reduxjs/toolkit';

import rankings from './rankingsSlice';
import openTasks from './openTasksSlice'


const rankingsReducers = combineReducers({
  rankings,
  openTasks,
});

export default rankingsReducers;