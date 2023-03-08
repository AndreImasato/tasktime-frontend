import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI imports
import { 
  ListItem,
  Grid,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { lightBlue, yellow } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

// Reducer imports
import { setSelectedCycle, setIsAdding } from 'src/store/slices/projects/cyclesSlice';

// Custom imports
import StyledDateTimeDisplay from 'src/components/ui/StyledDateTimeDisplay';


const CycleItem = (props) => {
  const { cycle } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const { selectedCycle } = useSelector(({ tasktime }) => tasktime.cycles);
  const [ bgColor, setBgColor ] = useState(theme.palette.common.white);

  useEffect(() => {
    if (selectedCycle && selectedCycle.public_id === cycle.public_id){
      setBgColor(lightBlue[100]);
    } else {
      if (!!cycle.dt_end){
        setBgColor(theme.palette.common.white);  
      } else {
        setBgColor(yellow[500]);
      }
    }
  }, [selectedCycle, cycle]);

  return (
    <ListItem
      sx={{ 
        backgroundColor: bgColor
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