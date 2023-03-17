import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

export const getTasks = createAsyncThunk(
  'tasktime/tasks/getTasks',
  async () => {
    const response = await axios.get('/timer/tasks/');
    const data = await response.data;
    return data;
  }
);

export const addTask = createAsyncThunk(
  'tasktime/tasks/addTask',
  async (payload) => {
    const response = await axios.post('/timer/tasks/', payload);
    const data = await response.data;
    if (response.status !== 201){
      enqueueSnackbar(
        'Erro ao adicionar tarefa',
        {
          variant: 'error',
          autoHideDuration: 2000,
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          }
        },
      );
      return;
    }
    return data;
  }
);

export const patchTask = createAsyncThunk(
  'tasktime/tasks/patchTask',
  async (payload) => {
    const { public_id, data } = payload;
    const response = await axios.patch(`/timer/tasks/${public_id}/`, data);
    if (response.status !== 200){
      enqueueSnackbar(
        'Erro ao atualizar tarefa',
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
    const responseData = await response.data;
    return responseData;
  }
)

export const removeTask = createAsyncThunk(
  'tasktime/tasks/removeTask',
  async (payload) => {
    const { public_id } = payload;
    const response = await axios.patch(`/timer/tasks/${public_id}/`, { is_active: false });
    if (response.status !== 200){
      enqueueSnackbar(
        'Erro ao remover a tarefa',
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


const tasksAdapter = createEntityAdapter({
  selectId: (task) => task.public_id,
});

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
} = tasksAdapter.
  getSelectors((state) => state.tasktime.tasks);

const initialState = {
  searchText: '',
  isModalOpen: false,
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
  extraReducers: {
    [getTasks.fulfilled]: tasksAdapter.setAll,
    [addTask.fulfilled]: tasksAdapter.addOne,
    [removeTask.fulfilled]: tasksAdapter.removeOne,
    [patchTask.fulfilled]: tasksAdapter.upsertOne,
  }
});

export const {
  setTaskSearchText,
  setIsModalOpen
} = tasksSlice.actions;

export default tasksSlice.reducer;