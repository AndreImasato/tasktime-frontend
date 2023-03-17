import { combineReducers } from '@reduxjs/toolkit';

import projects from './projectsSlice';
import tasks from './tasksSlice';
import cycles from './cyclesSlice';


const tasktimeReducers = combineReducers({
  projects,
  tasks,
  cycles,
});

export default tasktimeReducers;