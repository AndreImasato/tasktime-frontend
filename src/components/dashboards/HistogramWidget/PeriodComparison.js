import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { 
  Box,
  Typography,
  Grid
} from '@mui/material';
import { red, green } from '@mui/material/colors'
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const PeriodComparison = (props) => {
  const { timeData, period } = useSelector(({ dashboards }) => dashboards.histogram);
  const [ diffNum, setDiffNum ] = useState(undefined);
  const [ diffPerc, setDiffPerc ] = useState(undefined);
  const [ isGreater, setIsGreater ] = useState(undefined);
  const [ auxText, setAuxText ] = useState('');

  useEffect(() => {
    if (!_.isEmpty(timeData[period])){
      const { additional_info: { current_value, last_value } } = timeData[period];
      let newDiffNum;
      if (!last_value || last_value === 0){
        newDiffNum = 0;
      } else {
        newDiffNum = (current_value - last_value) / last_value;
      }
      const newDiffPerc = newDiffNum * 100;
      const newIsGreater = newDiffNum > 0 ? true : false;
      setDiffNum(newDiffNum);
      setDiffPerc(newDiffPerc);
      setIsGreater(newIsGreater);

      switch (period){
        case 'month':
          setAuxText('em relação ao mês passado');
          break;
        case 'year':
          setAuxText('em relação ao ano passado');
          break;
        default:
          // week is default
          setAuxText('em relação à semana passada');
          break;
      }
    }
  }, [timeData, period]);

  if (diffNum === 0){
    return null;
  }

  return (
    <Grid container spacing={1} sx={{ alignItems: 'center' }}>
      <Grid item>
        <Box
          sx={{
            borderRadius: "50%",
            backgroundColor: (theme) => isGreater ? green[100] : red[200],
            width: "2em",
            height: "2em",
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {isGreater
            ? (<TrendingUpIcon 
              sx={{ 
                color: (theme) => green[700]
              }}
            />)
            : (<TrendingDownIcon 
              sx={{
                color: (theme) =>  red[700]
              }}
            />)
          }

        </Box>
      </Grid>
      <Grid item>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 'bold',
            color: (theme) => theme.palette.common.black
          }}
        >
          {`${Math.round(diffPerc, 2)} %`}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          sx={{
            fontSize: 16,
            color: (theme) => theme.palette.grey[600]
          }}
        >
          {auxText}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PeriodComparison;