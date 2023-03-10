import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRankings = createAsyncThunk(
  'dashboards/rankings/getRankings',
  async () => {
    const response = await axios.get('/timer/duration-ranking/');
    const data = await response.data;
    return data;
  }
);

const initialState = {
  rankingData: {},
}

const rankingsSlice = createSlice({
  name: 'dashboards/rankings',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getRankings.fulfilled]: (state, action) => {
      state.rankingData = action.payload;
    }
  },
});

export default rankingsSlice.reducer;