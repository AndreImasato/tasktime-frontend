import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';


export const getProjects = createAsyncThunk(
  'tasktime/projects/getProjects',
  async () => {
    const response = await axios.get('/timer/projects/');
    const data = await response.data;
    return data;
  }
);

const projectsAdapter = createEntityAdapter({
  selectId: (project) => project.public_id
});

export const { selectAll: selectProjects, selectEntityById: selectProjectById } = projectsAdapter.getSelectors((state) => state.tasktime.projects);

const initialState = {
  searchText: '',
  isModalOpen: false,
  isEditing: false,
};

const projectsSlice = createSlice({
  name: 'tasktime/projects',
  initialState: projectsAdapter.getInitialState(
    initialState
  ),
  reducers: {
    setProjectSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      }
    },
    setIsModalOpen: {
      reducer: (state, action) => {
        state.isModalOpen = action.payload;
      }
    },
    setIsEditing: {
      reducer: (state, action) => {
        console.log(action);
        state.isEditing = action.payload;
      }
    }
  },
  extraReducers: {
    [getProjects.fulfilled]: projectsAdapter.setAll,
  }
});

export const {
  setProjectSearchText,
  setIsModalOpen,
  setIsEditing,
} = projectsSlice.actions;

export default projectsSlice.reducer;