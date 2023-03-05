import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// MUI imports
import { 
  Grid,
} from '@mui/material';

import withLayout from 'src/hoc/withLayout';
import withReducer from 'src/hoc/withReducer';
import reducer from 'src/store/slices/projects';

// Custom components
import { 
  ProjectSearchBar,
  ProjectsList,
  ProjectAddButton,
  ProjectDialog
} from 'src/components/tasktime/projects';

// Reducers
import { getProjects } from 'src/store/slices/projects/projectsSlice'

const Projects = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <div
      style={{
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100
      }}
    >
      {/* Search bar */}
      <Grid
        container
      >
        <ProjectSearchBar />
      </Grid>
      {/* Add Button */}
      <ProjectAddButton />
      {/* ProjectsList */}
      <Grid container>
        <ProjectsList />
      </Grid>
      <ProjectDialog />
    </div>
  )
}

export default withLayout(withReducer('tasktime', reducer)(Projects));