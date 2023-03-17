import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import _ from 'lodash';

// MUI imports
import { 
  Paper,
  Typography,
  List,
  Divider
} from '@mui/material';

// Reducer imports
import { selectTaskById } from 'src/store/slices/projects/tasksSlice';
import { selectAllCycles } from 'src/store/slices/projects/cyclesSlice';

// Custom imports
import CycleItem from './CycleItem';

const CycleList = (props) => {
  const params = useParams();
  const task = useSelector((state) => selectTaskById(state, params.taskId));
  const allCycles = useSelector(selectAllCycles);
  const [ cycles, setCycles ] = useState([]);
  const [ totalParsedTime, setTotalParsedTime ] = useState('');

  useEffect(() => {
    if (allCycles && task){
      setCycles(_.filter(allCycles, { task: task.id }));
    }
  }, [allCycles, task]);

  useEffect(() => {
    if (cycles.length > 0){
      const totalDuration = cycles.reduce((acc, cycle) => acc + cycle.duration, 0);
      const hours = ~~(totalDuration / 3600);
      const hoursRemainder = totalDuration % 3600;
      const minutes = ~~(hoursRemainder / 60);
      const seconds = hoursRemainder % 60;
      setTotalParsedTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2,'0')}`);
    } else {
      setTotalParsedTime('00:00:00');
    }
  }, [cycles]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Paper
        sx={{
          width: '90%',
          overflow: 'hidden',
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          sx={{
            marginTop: 2,
            marginLeft: 2,
            marginBottom: 2
          }}
        >
          Intervalos
        </Typography>
        <Divider />
        <List
          sx={{
            width: '100%',
            height: '50vh',
            overflowY: 'scroll'
          }}
        >
          {cycles.length > 0
            ? _.orderBy(cycles, (cy) => new Date(cy.dt_start), 'desc').map((cy, ix) => (
              <>
                <CycleItem key={cy.public_id} cycle={cy} />
                {ix+1 !== cycles.length ? <Divider /> : null}
              </>
            ))
            : (<Typography textAlign="center" variant="h6">Nenhum intervalo registrado!</Typography>)
          }
        </List>
        <Divider variant="middle" />
        <Typography 
          sx={{
            marginTop: 2,
            marginBottom: 2,
            marginRight: 2
          }}
          textAlign="end"
        >
          Duração Total: <strong>{totalParsedTime}</strong>
        </Typography>
      </Paper>
    </motion.div>
  )
}

export default CycleList;