import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

// MUI imports
import { 
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'

// Reducers imports
import { setIsModalOpen } from 'src/store/slices/projects/tasksSlice';

const TaskAddButton = (props) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Tooltip title="Adicionar nova tarefa">
        <IconButton
          onClick={() => {
            dispatch(setIsModalOpen(true));
          }}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.light
            },
            boxShadow: 3
          }}
        >
          <AddIcon
            sx={{
              fontSize: 32,
              color: (theme) => theme.palette.primary.contrastText
            }}
          />
        </IconButton>
      </Tooltip>
    </motion.div>
  )
}

export default TaskAddButton;