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

export const addCycle = createAsyncThunk(
  'tasktime/cycles/addCycle',
  async (payload) => {
    const response = await axios.post('/timer/cycles/', payload);
    const data = await response.data;
    if (response.status !== 201){
      //TODO emit error
      return;
    }
    return data;
  }
)


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
  selectedCycle: null
};

const cyclesSlice = createSlice({
  name: 'tasktime/cycles',
  initialState: cyclesAdapter.getInitialState(
    initialState
  ),
  reducers: {
    setIsAdding: {
      reducer: (state, action) => {
        state.isAdding = action.payload;
      },
    },
    setSelectedCycle: {
      reducer: (state, action) => {
        state.selectedCycle = action.payload;
      }
    }
  },
  extraReducers: {
    [getCycles.fulfilled]: cyclesAdapter.setAll,
    [addCycle.fulfilled]: cyclesAdapter.addOne,
  },
});

export const {
  setIsAdding,
  setSelectedCycle,
} = cyclesSlice.actions;

export default cyclesSlice.reducer;