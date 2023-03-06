import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI imports
import { 
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';

// Reducer imports
import { setIsModalOpen } from 'src/store/slices/projects/tasksSlice';

// Custom imports
import TaskForm from './TaskForm';

const TaskDialog = (props) => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector(({ tasktime }) => tasktime.tasks);

  const handleClose = () => {
    dispatch(setIsModalOpen(false));
  }

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby='task-dialog'
    >
      <DialogTitle
        id="task-dialog"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100]
        }}
      >
        Registrar nova Tarefa
      </DialogTitle>
      <DialogContent 
        dividers
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100]
        }}
      >
        <TaskForm />
      </DialogContent>
    </Dialog>
  );
}

export default TaskDialog;