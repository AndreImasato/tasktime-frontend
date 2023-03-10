import React from 'react';

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

const Projects = (props) => {

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