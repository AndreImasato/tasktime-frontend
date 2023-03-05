import { combineReducers } from '@reduxjs/toolkit';

import projects from './projectsSlice';


const tasktimeReducers = combineReducers({
  projects,
});

export default tasktimeReducers;