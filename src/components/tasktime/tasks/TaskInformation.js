import React from 'react';

// MUI imports
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Custom imports
import TaskForm from './TaskForm';

const TaskInformation = (props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="task-information-content"
        id="task-information-header"
      >
        <Typography>
          Informações da Tarefa
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TaskForm />
      </AccordionDetails>
    </Accordion>
  )
}

export default TaskInformation;