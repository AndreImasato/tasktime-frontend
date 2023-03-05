import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';


const tasksAdapter = createEntityAdapter({
  selectId: (task) => task.public_id,
});

export const {
  selectAll: selectAllTasks,
  selectEntityById: selectTaskById,
  selectEntities: selectTasks
} = tasksAdapter.
  getSelectors((state) => state.tasktime.tasks);

const initialState = {
  searchText: '',
  isModalOpen: true,
}

const tasksSlice = createSlice({
  name: 'tasktime/tasks',
  initialState: tasksAdapter.getInitialState(
    initialState
  ),
  reducers: {
    setTaskSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      }
    },
    setIsModalOpen: {
      reducer: (state, action) => {
        state.isModalOpen = action.payload;
      }
    },
  },
  extraReducers: {}
});

export const {
  setTaskSearchText,
  setIsModalOpen
} = tasksSlice.actions;

export default tasksSlice.reducer;