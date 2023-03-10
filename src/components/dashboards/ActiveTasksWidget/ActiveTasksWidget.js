import React from 'react';
import { motion } from 'framer-motion';
import Carousel from 'react-material-ui-carousel'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI components
import { 
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
  CardActions
} from '@mui/material';

// Custom imports
import Utils from 'src/utils';

const ActiveTasksWidget = (props) => {

  const { openTasks } = useSelector(({ dashboards }) => dashboards.openTasks);

  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}s
    >
      <Paper
        sx={{ width: "100%", padding: 2 }}
      >
        <Box>
          <Typography variant="h6">Tarefas Abertas</Typography>
          {openTasks.length > 0
            ? (
              <Carousel>
                {openTasks.map((ot) => (
                  <Card
                    key={ot.public_id}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 16 }}>{ot.name}</Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        to={`/projects/${ot.project_public_id}/${ot.public_id}`}
                        style={{
                          textDecoration: 'none'
                        }}
                      >
                        <Typography
                          sx={{
                            color: (theme) => theme.palette.primary.main
                          }}
                        >
                          DETALHES
                        </Typography>
                      </Link>
                    </CardActions>
                  </Card>
                ))}
              </Carousel>
            )
            : (<Typography variant="body1">Nenhuma Tarefa em Aberto!</Typography>)
          }

        </Box>
      </Paper>
    </motion.div>
  )
}

export default ActiveTasksWidget;