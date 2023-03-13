import { RepeatOneSharp } from '@mui/icons-material';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';


export const getTimeSeries = createAsyncThunk(
  'dashboards/histograms/getTimeSeries',
  async (payload) => {
    const date_target = payload?.date_target || moment(new Date()).format('YYYY-MM-DD');
    const response = await axios.get(
      '/timer/total-time/',
      null,
      {
        params: {
          date_target: date_target
        }
      },
    );
    const data = await response.data;
    return data;
  }
);

const initialState = {
  timeData: {},
  period: "week",
};

const histogramSlice = createSlice({
  name: 'dashboards/histogram',
  initialState: initialState,
  reducers: {
    setPeriod: {
      reducer: (state, action) => {
        state.period = action.payload;
      }
    },
  },
  extraReducers: {
    [getTimeSeries.fulfilled]: (state, action) => {
      state.timeData = action.payload;
    },
  },
});

export const {
  setPeriod
} = histogramSlice.actions;

export default histogramSlice.reducer;