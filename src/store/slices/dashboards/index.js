import { combineReducers } from '@reduxjs/toolkit';

import rankings from './rankingsSlice';
import openTasks from './openTasksSlice';
import latestTasks from './latestTasksSlice';


const rankingsReducers = combineReducers({
  rankings,
  openTasks,
  latestTasks,
});

export default rankingsReducers;