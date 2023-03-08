import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI imports
import { 
  ListItem,
  ListItemIcon,
  ListItemButton,
  Grid,
  ListItemText,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Reducer imports
import { setSelectedCycle, setIsAdding } from 'src/store/slices/projects/cyclesSlice';

// Custom imports
import StyledDateTimeDisplay from 'src/components/ui/StyledDateTimeDisplay';


const CycleItem = (props) => {
  const { cycle } = props;
  const dispatch = useDispatch();
  const { selectedCycle } = useSelector(({ tasktime }) => tasktime.cycles);
  return (
    <ListItem
      secondaryAction={
        <IconButton 
          onClick={() => {
            dispatch(setSelectedCycle(cycle));
            dispatch(setIsAdding(true));
          }}
        >
          <EditIcon color="warning" />
        </IconButton>
      }
    >
      <Grid container>
        <Grid item container xs={6} md={6} xl={6} lg={6}>
          <StyledDateTimeDisplay dateTimeObj={cycle.dt_start} />
        </Grid>
        <Grid item xs={6} md={6} xl={6} lg={6}>
          <StyledDateTimeDisplay dateTimeObj={cycle.dt_end} />
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default CycleItem;