import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI imports
import { 
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';

// Reducer imports
import { setIsModalOpen } from 'src/store/slices/projects/projectsSlice';

// Custom components
import ProjectForm from './ProjectForm';

const ProjectDialog = (props) => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector(({ tasktime }) => tasktime.projects);

  const handleClose = () => {
    dispatch(setIsModalOpen(false));
  }

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="project-dialog"
    >
      <DialogTitle
        id="project-dialog"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100]
        }}
      >
        Registrar Novo Projeto
      </DialogTitle>
      <DialogContent dividers
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100]
        }}
      >
        <ProjectForm />
      </DialogContent>
    </Dialog>
  )
}

export default ProjectDialog;