import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// MUI imports
import { 
  Grid,
} from '@mui/material';

//Custom imports
import withLayout from 'src/hoc/withLayout';
import withReducer from 'src/hoc/withReducer';
import reducer from 'src/store/slices/dashboards';
import { getRankings } from 'src/store/slices/dashboards/rankingsSlice';
import { getOpenTasks } from 'src/store/slices/dashboards/openTasksSlice';
import { getProjects } from 'src/store/slices/projects/projectsSlice';
import { getTasks } from 'src/store/slices/projects/tasksSlice';
import { getCycles } from 'src/store/slices/projects/cyclesSlice';

// Custom imports
import { RankingWidget, ActiveTasksWidget, HistogramWidget, LatestTasksWidget } from 'src/components/dashboards';


const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRankings());
    dispatch(getOpenTasks());
    dispatch(getProjects());
    dispatch(getTasks());
    dispatch(getCycles());
  }, []);
  return (
    <div
      style={{
        marginLeft: 100,
        marginRight: 100,
        marginTop: 10
      }}
    >
      <Grid container>
        <Grid 
          item 
          container
          xs={12} md={12} lg={12}
        >
          {/* Histogram */}
          <HistogramWidget />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid 
          item 
          container
          xs={4} md={4} lg={4}
        >
          {/* Rankings */}
          <RankingWidget />
        </Grid>
        <Grid 
          item 
          container
          xs={4} md={4} lg={4}
        >
          {/* Active Tasks */}
          <ActiveTasksWidget />
        </Grid>
        <Grid 
          item 
          container
          xs={4} md={4} lg={4}
        >
          {/* Latest tasks */}
          <LatestTasksWidget />
        </Grid>
      </Grid>
    </div>
  )
}

export default withLayout(withReducer('dashboards', reducer)(Home));