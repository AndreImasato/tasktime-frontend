import { combineReducers } from '@reduxjs/toolkit';

import projects from './projectsSlice';
import tasks from './tasksSlice';


const tasktimeReducers = combineReducers({
  projects,
  tasks,
});

export default tasktimeReducers;