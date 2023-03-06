import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';


export const getCycles = createAsyncThunk(
  'tasktime/cycles/getCycles',
  async () => {
    const response = await axios.get('/timer/cycles/');
    const data = await response.data;
    return data;
  }
);


const cyclesAdapter = createEntityAdapter({
  selectId: (cycle) => cycle.public_id,
});

export const {
  selectAll: selectAllCycles,
  selectById: selectCycleById
} = cyclesAdapter.
  getSelectors((state) => state.tasktime.cycles);

const initialState = {
  isAdding: false,
};

const cyclesSlice = createSlice({
  name: 'tasktime/cycles',
  initialState: cyclesAdapter.getInitialState(
    initialState
  ),
  reducers: {
    setIsAdding: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
    },
  },
  extraReducers: {
    [getCycles.fulfilled]: cyclesAdapter.setAll,
  },
});

export const {

} = cyclesSlice.actions;

export default cyclesSlice.reducer;