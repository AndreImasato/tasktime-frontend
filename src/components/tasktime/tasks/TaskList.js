import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

// MUI imports
import { 
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

// Reducer imports
import { selectProjectById } from 'src/store/slices/projects/projectsSlice';
import { selectAllTasks } from 'src/store/slices/projects/tasksSlice';

// Custom Imports
import TaskItem from './TaskItem';

const TaskList = (props) => {
  const params = useParams();
  const project = useSelector((state) => {
    return selectProjectById(state, params.projectId)
  });
  const allTasks = useSelector(selectAllTasks);
  
  const { searchText } = useSelector(({ tasktime }) => tasktime.tasks);
  const [ filteredData, setFilteredData ] = useState([]);
  const [ totalParsedTime, setTotalParsedTime ] = useState('');
  const [ tasks, setTasks ] = useState([]);

  useEffect(() => {
    if (allTasks && project){
      setTasks(_.filter(allTasks, { project: project.id }));
    }
  }, [allTasks, project]);

  useEffect(() => {
    const getFilteredArray = (entities, _searchText) => {
      if (_searchText === ''){
        return entities;
      }
      return _.filter(entities, (item) => {
        return item.name.toLowerCase().includes(_searchText.toLowerCase())
      });
    }

    if (tasks && tasks.length > 0){
      setFilteredData(getFilteredArray(tasks, searchText));
    }
  }, [tasks, searchText]);

  useEffect(() => {
    if (filteredData.length > 0){
      const totalDuration = filteredData.reduce((acc, task) => {
        return acc + task.duration;
      }, 0);
      const hours = ~~(totalDuration / 3600);
      const hoursRemainder = totalDuration % 3600;
      const minutes = ~~(hoursRemainder / 60);
      const seconds = hoursRemainder % 60;
      setTotalParsedTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2,'0')}`);
    } else {
      setTotalParsedTime('00:00:00')
    }
  }, [filteredData]);


  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <Typography 
        component="h1"
        variant="h6"
        sx={{
          marginTop: 1,
          marginLeft: 2
        }}
      >
        Lista de Tarefas
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Duração</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0
              ? (
                <>
                  {filteredData.map((task) => (
                    <TaskItem key={task.public_id} task={task} />
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{totalParsedTime}</TableCell>
                  </TableRow>
                </>
              )
              : (<TableRow>
                <Typography>Nenhuma tarefa!</Typography>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TaskList;