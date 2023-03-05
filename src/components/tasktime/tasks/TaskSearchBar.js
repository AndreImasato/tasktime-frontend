import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// MUI components
import { 
  Grid,
  Paper,
  TextField
} from '@mui/material';

// Reducers
import { setTaskSearchText } from 'src/store/slices/projects/tasksSlice';

const TaskSearchBar = (props) => {
  const dispatch = useDispatch();
  const { searchText } = useSelector(({ tasktime }) => tasktime.tasks);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <TextField
        fullWidth
        variant="standard"
        onChange={(ev) => {
          dispatch(setTaskSearchText(ev.target.value));
        }}
        placeholder="Buscar pelo nome"
        value={searchText}
        size="medium"
        sx={{ 
          backgroundColor: (theme) => theme.palette.common.white,
          borderColor: (theme) => theme.palette.common.white,
          borderWidth: 0,
          boxShadow: 2,
          padding: 1,
          borderRadius: 1
        }}
        InputProps={{
          disableUnderline: true
        }}
      />
    </motion.div>
  )
}

export default TaskSearchBar;