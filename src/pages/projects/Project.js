import React from 'react';

// MUI imports
import { 
  Grid,
  Paper,
  TextField,
  Divider
} from '@mui/material';

// Custom imports
import withLayout from 'src/hoc/withLayout';
import withReducer from 'src/hoc/withReducer';
import reducer from 'src/store/slices/projects';

// Custom components
import {
  ProjectInformation,
} from 'src/components/tasktime/projects';

import { 
  TaskAddButton,
  TaskSearchBar,
  TaskList
} from 'src/components/tasktime/tasks'


const Project = (props) => {
  return (
    <div
      style={{
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100
      }}
    >
      <ProjectInformation />
      {/* //TODO task list */}
      <Grid 
        container
        spacing={2}
        sx={{
          marginTop: 1,
          height: 60,
          alignItems: 'center'
        }}
      >
        <Grid item xs={11} md={11} lg={11} sx={{ height: "100%" }}>
          <TaskSearchBar />
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
          <TaskAddButton />
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 3 }}>
        <TaskList />
      </Grid>
      {/* //TODO task add dialog */}
    </div>
  )
}

export default withLayout(withReducer('tasktime', reducer)(Project));