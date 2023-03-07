import React from 'react';
import { useSelector } from 'react-redux';

// MUI imports
import { 
  Grid,
} from '@mui/material';

// Custom imports
import withLayout from 'src/hoc/withLayout';
import withReducer from 'src/hoc/withReducer';
import reducer from 'src/store/slices/projects';

// Custom components
import { TaskInformation } from 'src/components/tasktime/tasks';
import { CycleForm, CycleAddButton, CycleList } from 'src/components/tasktime/cycles';

const Task = (props) => {
  const { isAdding } = useSelector(({ tasktime }) => tasktime.cycles);
  return (
    <div
      style={{
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100
      }}
    >
      <TaskInformation />
      <Grid 
        container
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 3,
          marginBottom: 3
        }}
      >
        {isAdding 
          ? (<CycleForm />)
          : (<CycleAddButton />)
        }
      </Grid>
      {/* //TODO cycles list */}
      <CycleList />
      {/* //TODO total duration */}
    </div>
  )
}

export default withLayout(withReducer('tasktime', reducer)(Task));