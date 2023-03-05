import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const ProjectItem = (props) => {
  const { project } = props;
  const navigate = useNavigate();

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
                  console.log(`Deletando ${project.public_id}`)
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
                navigate({ pathname: `/projects/${project.public_id}` })
              }}
            >
              Detalhes
            </Button>
          </CardActions>
        </Card>
      </motion.div>
    </Grid>
  )
}

export default ProjectItem;