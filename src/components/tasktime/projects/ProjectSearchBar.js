import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// MUI components
import { 
  Grid,
  Paper,
  TextField,
} from '@mui/material';

// Reducers
import { setProjectSearchText } from 'src/store/slices/projects/projectsSlice';

const ProjectSearchBar = (props) => {
  const dispatch = useDispatch();
  const { searchText } = useSelector(({ tasktime }) => tasktime.projects);

  return (
    <Grid item xs={12} md={12} lg={12}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <TextField
          fullWidth
          variant="standard"
          onChange={(ev) => {
            dispatch(setProjectSearchText(ev.target.value));
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
    </Grid>
  )
}

export default ProjectSearchBar;