import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';


export const getOpenTasks = createAsyncThunk(
  'dashboards/openTasks/getOpenTasks',
  async () => {
    const response = await axios.get('/timer/open-tasks/');
    const data = await response.data;
    return data;
  }
);

const initialData = {
  openTasks: [],
};

const openTasksSlice = createSlice({
  name: 'dashboards/openTasks',
  initialState: initialData,
  reducers: {},
  extraReducers: {
    [getOpenTasks.fulfilled]: (state, action) => {
      state.openTasks = action.payload;
    }
  }
});

export default openTasksSlice.reducer;