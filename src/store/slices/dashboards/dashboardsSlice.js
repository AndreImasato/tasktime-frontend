import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRankings = createAsyncThunk(
  'tasktime/dashboards/getRankings',
  async () => {
    const response = await axios.get('/timer/duration-ranking/');
    const data = await response.data;
    return data;
  }
);


const initialState = {
  rankingData: {},
}

const dashboardsSlice = createSlice({
  name: 'dashboards/dashboards',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getRankings.fulfilled]: (state, action) => {
      state.rankingData = action.payload;
    }
  },
});

export default dashboardsSlice.reducer;