import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

// MUI components
import { 
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
  CardActions,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const LatestTasksWidget = (props) => {

  const { latestTasks } = useSelector(({ dashboards }) => dashboards.latestTasks);

  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Paper
        sx={{ width: "100%", padding: 2, height: 420 }}
      >
        <Box>
          <Typography variant="h6">
            Últimas Tarefas
          </Typography>
          {latestTasks.length > 0
            ? (
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Última modificação</TableCell>
                      <TableCell>Tarefa</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {latestTasks.map((task) => (
                      <TableRow key={task.public_id}>
                        <TableCell>{moment(new Date(task.last_modified_on)).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{task.name}</TableCell>
                        <TableCell>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/projects/${task.project_public_id}/${task.public_id}`}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: (theme) => theme.palette.primary.main
                              }}
                            >
                              VISUALIZAR
                            </Typography>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
            : (<Typography variant="body1">Nenhuma Tarefa Recente</Typography>)
          }
        </Box>

      </Paper>
    </motion.div>
  )
}

export default LatestTasksWidget;