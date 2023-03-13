import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getLatestTasks = createAsyncThunk(
  'dashboards/latest/getLatestTasks',
  async () => {
    const response = await axios.get('/timer/latest-tasks/');
    const data = await response.data;
    return data;
  }
);

const initialState = {
  latestTasks: []
};

const latestTasksSlice = createSlice({
  name: 'dashboards/latesTasks',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getLatestTasks.fulfilled]: (state, action) => {
      state.latestTasks = action.payload;
    }
  }
});

export default latestTasksSlice.reducer;