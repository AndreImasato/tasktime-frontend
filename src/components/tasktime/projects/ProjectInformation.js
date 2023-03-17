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
import ProjectForm from './ProjectForm';

const ProjectInformation = (props) => {
  return (

    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="project-information-content"
          id="project-information-header"
        >
          <Typography>
            Informações do Projeto
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProjectForm />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default ProjectInformation;