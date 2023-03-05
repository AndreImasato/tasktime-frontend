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

export const addProject = createAsyncThunk(
  'tasktime/projects/addProject',
  async (payload) => {
    const response = await axios.post('/timer/projects/', payload);
    const data = await response.data;
    if (response.status !== 201){
      //TODO emit error
      return;
    }
    return data;
  }
);

export const removeProject = createAsyncThunk(
  'tasktime/projects/removeProject',
  async (payload) => {
    const { public_id } = payload;
    const response = await axios.patch(`/timer/projects/${public_id}/`, { is_active: false });
    if (response.status !== 200){
      //TODO emit error
      return;
    }
    return public_id;
  }
)

const projectsAdapter = createEntityAdapter({
  selectId: (project) => project.public_id,
});

export const { selectAll: selectProjects, selectEntityById: selectProjectById } = projectsAdapter.getSelectors((state) => state.tasktime.projects);

const initialState = {
  searchText: '',
  isModalOpen: false,
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
  },
  extraReducers: {
    [getProjects.fulfilled]: projectsAdapter.setAll,
    [addProject.fulfilled]: projectsAdapter.addOne,
    [removeProject.fulfilled]: projectsAdapter.removeOne,
  }
});

export const {
  setProjectSearchText,
  setIsModalOpen,
} = projectsSlice.actions;

export default projectsSlice.reducer;