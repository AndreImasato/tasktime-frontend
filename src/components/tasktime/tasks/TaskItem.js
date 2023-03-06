import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';

// MUI imports
import { 
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  Grid
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LaunchIcon from '@mui/icons-material/Launch';


const TaskItem = (props) => {
  const { task } = props;
  const navigate = useNavigate();
  const params = useParams();
  return (
    <TableRow>
      <TableCell>
        <Grid container>
          <Grid item>
            <Tooltip title="Remover tarefa">
              <IconButton>
                <DeleteForeverIcon
                  sx={{
                    color: (theme) => theme.palette.error.light
                  }}
                />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Visualizar tarefa">
              <IconButton
                onClick={() => {
                  navigate({ pathname: `project/${params.projectId}/task/${task.public_id}` });
                }}
              >
                <LaunchIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>{task.name}</TableCell>
      <TableCell>{task.parsed_duration}</TableCell>
    </TableRow>
  )
}

export default TaskItem;