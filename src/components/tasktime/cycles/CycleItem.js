import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI imports
import { 
  ListItem,
  ListItemIcon,
  ListItemButton,
  Grid,
  ListItemText,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { lightBlue } from '@mui/material/colors';

// Reducer imports
import { setSelectedCycle, setIsAdding } from 'src/store/slices/projects/cyclesSlice';

// Custom imports
import StyledDateTimeDisplay from 'src/components/ui/StyledDateTimeDisplay';


const CycleItem = (props) => {
  const { cycle } = props;
  const dispatch = useDispatch();
  const { selectedCycle } = useSelector(({ tasktime }) => tasktime.cycles);
  const [ active, setActive ] = useState(false);

  useEffect(() => {
    if (selectedCycle && selectedCycle.public_id === cycle.public_id){
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selectedCycle]);

  return (
    <ListItem
      sx={{ 
        backgroundColor: active ? lightBlue[100] : (theme) => theme.palette.common.white
      }}
      secondaryAction={
        <Tooltip title="Editar intervalo">
          <IconButton 
            onClick={() => {
              dispatch(setSelectedCycle(cycle));
              dispatch(setIsAdding(true));
            }}
            sx={{
              '& svg': {
                transition: '0.2s',
                transform: 'translateX(0) rotate(0)'
              },
              '&:hover, &:focus': {
                bgcolor: 'unset',
                '& svg': {
                  transform: 'rotate(-30deg)'
                }
              }
            }}
          >
            <EditIcon color="warning" />
          </IconButton>
        </Tooltip>
      }
    >
      <Grid container sx={{ width: "100%" }}>
        <Grid 
          item 
          container 
          xs={2} md={2} xl={2} lg={2} 
          sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', marginRight: 1 }}
        >
          <Typography fontWeight="bold">Início do</Typography>
          <Typography fontWeight="bold">Intervalo</Typography>
        </Grid>
        <Grid item container xs={3} md={3} xl={3} lg={3}>
          <StyledDateTimeDisplay dateTimeObj={cycle.dt_start} />
        </Grid>
        <Grid 
          item 
          container 
          xs={2} md={2} xl={2} lg={2} 
          sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', marginRight: 1 }}
        >
          <Typography fontWeight="bold">Término do</Typography>
          <Typography fontWeight="bold">Intervalo</Typography>
        </Grid>
        <Grid item xs={3} md={3} xl={3} lg={3}>
          <StyledDateTimeDisplay dateTimeObj={cycle.dt_end} />
        </Grid>
        <Grid item container xs={1} md={1} xl={1} lg={1} sx={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Typography fontWeight="bold">Duração</Typography>
          <Typography fontWeight="bold">{cycle.parsed_duration}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default CycleItem;