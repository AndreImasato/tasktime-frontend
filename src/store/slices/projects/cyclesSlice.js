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
);

export const patchCycle = createAsyncThunk(
  'tasktime/cycles/patchCycle',
  async (payload) => {
    const { public_id, data } = payload;
    const response = await axios.patch(`/timer/cycles/${public_id}/`, data);
    if (response.status !== 200){
      //TODO emit error
      return;
    }
    const responseData = await response.data;
    return responseData;
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
    [patchCycle.fulfilled]: cyclesAdapter.upsertOne,
  },
});

export const {
  setIsAdding,
  setSelectedCycle,
} = cyclesSlice.actions;

export default cyclesSlice.reducer;