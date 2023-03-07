import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// MUI imports
import { 
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Reducer imports
import { setSelectedCycle, setIsAdding } from 'src/store/slices/projects/cyclesSlice';

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
      <ListItemText
        id={cycle.public_id}
        primary={`Data Início: ${moment(cycle.dt_start).format("DD/MM/YYYY HH:mm:ss")} | Data Fim: ${moment(cycle.dt_end).format("DD/MM/YYYY HH:mm:ss")}`}
        secondary={cycle.parsed_duration}
      />

    </ListItem>
  )
}

export default CycleItem;