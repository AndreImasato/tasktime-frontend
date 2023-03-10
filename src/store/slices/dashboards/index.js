import { combineReducers } from '@reduxjs/toolkit';

import dashboards from './dashboardsSlice';


const dashboardsReducers = combineReducers({
  dashboards,
});

export default dashboardsReducers;