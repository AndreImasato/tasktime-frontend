import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

// Custom components
import ConfirmationDialog from 'src/components/ui/ConfirmationDialog';

// Reducers
import { removeTask } from 'src/store/slices/projects/tasksSlice';


const TaskItem = (props) => {
  const { task } = props;
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [ openDialog, setOpenDialog ] = useState(false);


  const handleConfirmDialog = () => {
    dispatch(removeTask({ public_id: task.public_id }));
    setOpenDialog(false);
  }

  return (
    <TableRow>
      <TableCell>
        <Grid container>
          <Grid item>
            <Tooltip title="Remover tarefa">
              <IconButton
                onClick={() => {setOpenDialog(true)}}
              >
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
                  navigate({ pathname: `/project/${params.projectId}/task/${task.public_id}` });
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
      <ConfirmationDialog
        title="Remover Tarefa"
        description="Deseja realmente remover a tarefa?"
        cancelLabel="Cancelar"
        confirmLabel="Remover"
        handleCancelClick={() => setOpenDialog(false)}
        handleConfirmClick={handleConfirmDialog}
        open={openDialog}
      />
    </TableRow>
  )
}

export default TaskItem;