import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'

// MUI imports
import { 
  Grid, 
  Card, 
  CardHeader, 
  CardActions,
  IconButton ,
  Typography,
  Button
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Custom components
import ConfirmationDialog from 'src/components/ui/ConfirmationDialog';

// Reducers
import { removeProject } from 'src/store/slices/projects/projectsSlice';

const ProjectItem = (props) => {
  const { project } = props;

  const [ openDialog, setOpenDialog ] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirmDialog = () => {
    dispatch(removeProject({ public_id: project.public_id }));
    setOpenDialog(false);
  }

  return (
    <Grid item xs={2} md={4} sm={4}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader
            title={project.name}
            action={
              <IconButton
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <DeleteForeverIcon
                  sx={{
                    color: (theme) => theme.palette.error.light
                  }}
                />
              </IconButton>
            }
          />
          <CardActions sx={{ justifyContent: "space-between" }}>
            <div
              style={{ 
                display: "flex",
                flexDirection: "row",
                alignItems: 'center'
              }}
            >
              <AccessTimeIcon 
                size="small" 
                fontSize="small"
                sx={{
                  color: (theme) => theme.palette.grey[600]
                }}
              />
              <Typography 
                variant="subtitle1"
                sx={{
                  color: (theme) => theme.palette.grey[600],
                  marginLeft: 1
                }}
              >
                {project.parsed_duration}
              </Typography>
            </div>
            <Button 
              size="small"
              onClick={() => {
                navigate({ pathname: `/project/${project.public_id}` })
              }}
            >
              Detalhes
            </Button>
          </CardActions>
        </Card>
      </motion.div>
      <ConfirmationDialog
        title="Remover Projeto"
        description="Deseja realmente remover o projeto?"
        cancelLabel="Cancelar"
        confirmLabel="Remover"
        handleCancelClick={() => setOpenDialog(false)}
        handleConfirmClick={handleConfirmDialog}
        open={openDialog}
      />
    </Grid>
  )
}

export default ProjectItem;