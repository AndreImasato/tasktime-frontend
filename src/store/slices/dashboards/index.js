import { combineReducers } from '@reduxjs/toolkit';

import rankings from './rankingsSlice';
import openTasks from './openTasksSlice';
import latestTasks from './latestTasksSlice';
import histogram from './histogramSlice';


const rankingsReducers = combineReducers({
  rankings,
  openTasks,
  latestTasks,
  histogram,
});

export default rankingsReducers;