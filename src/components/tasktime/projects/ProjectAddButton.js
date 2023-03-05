import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

// MUI imports
import { 
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'

// Reducers imports
import { setIsModalOpen } from 'src/store/slices/projects/projectsSlice';

const ProjectAddButton = (props) => {
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Tooltip title="Adicionar novo projeto">
        <IconButton
          onClick={() => {
            dispatch(setIsModalOpen(true));
          }}
          sx={{
            position: "absolute",
            right: 100,
            bottom: 100,
            backgroundColor: (theme) => theme.palette.primary.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.light
            },
            boxShadow: 3
          }}
        >
          <AddIcon
            sx={{
              fontSize: 45,
              color: 'white',
            }}
          />
        </IconButton>
      </Tooltip>
    </motion.div>
  )
}

export default ProjectAddButton;