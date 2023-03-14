import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';


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
      enqueueSnackbar(
        'Erro ao adicionar projeto',
        {
          variant: 'error',
          autoHideDuration: 2000,
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          }
        }
      );
      return;
    }
    return data;
  }
);

export const patchProject = createAsyncThunk(
  'tasktime/projects/patchProject',
  async (payload) => {
    const { public_id, data } = payload;
    const response = await axios.patch(`/timer/projects/${public_id}/`, data);
    if (response.status !== 200){
      enqueueSnackbar(
        'Erro ao atualizar projeto',
        {
          variant: 'error',
          autoHideDuration: 2000,
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          }
        }
      )
      return;
    }
    const responseData = await response.data;
    return responseData;
  }
)

export const removeProject = createAsyncThunk(
  'tasktime/projects/removeProject',
  async (payload) => {
    const { public_id } = payload;
    const response = await axios.patch(`/timer/projects/${public_id}/`, { is_active: false });
    if (response.status !== 200){
      enqueueSnackbar(
        'Erro ao remover projeto',
        {
          variant: 'error',
          autoHideDuration: 2000,
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          }
        }
      );
      return;
    }
    return public_id;
  }
)

const projectsAdapter = createEntityAdapter({
  selectId: (project) => project.public_id,
});

export const { selectAll: selectProjects, selectById: selectProjectById } = projectsAdapter.getSelectors((state) => state.tasktime.projects);

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
    [patchProject.fulfilled]: projectsAdapter.upsertOne,
  }
});

export const {
  setProjectSearchText,
  setIsModalOpen,
} = projectsSlice.actions;

export default projectsSlice.reducer;