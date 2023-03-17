import React from 'react';
import { 
  Typography,
  Box
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment';

const StyledDateTimeDisplay = (props) => {
  const { dateTimeObj } = props;
  if (!dateTimeObj){
    return null;
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.grey[200],
          borderRadius: 3,
          height: 84,
          width: 84,
          padding: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 2
        }}
      >
        <Typography component="span">
          {moment(dateTimeObj).format('MMM').toUpperCase()}
        </Typography>
        <Typography component="h1" variant="h6">
          {moment(dateTimeObj).format('DD')}
        </Typography>
        <Typography component="span">
          {moment(dateTimeObj).format('YYYY')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div>
          <AccessTimeIcon sx={{ color: (theme) => theme.palette.grey[700] }} />
        </div>
        <div>
          <Typography variant="button" sx={{ color: (theme) => theme.palette.grey[700] }}>
            {moment(dateTimeObj).format("HH:mm")}
          </Typography>
        </div>
      </Box>
    </div>
  );
}

export default StyledDateTimeDisplay;