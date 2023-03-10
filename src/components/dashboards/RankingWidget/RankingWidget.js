import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// MUI components
import { 
  Box,
  Paper,
  Tab,
  Tabs,
  Typography
} from '@mui/material';

// Custom imports
import DonutChart from './DonutChart';


const TabPanel = (props) => {
  const { children, value, index, ...rest } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...rest}
    >
      {value === index
        ? (
          <Box sx={{ m: 2 }}>
            {children}
          </Box>
        )
        : null
      }
    </div>
  );
}


const RankingWidget = (props) => {
  const [tab, setTab] = useState(0);
  const { projects, tasks } = useSelector(({ dashboards }) => dashboards.rankings.rankingData);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  }

  return (
    <motion.div 
      style={{ width: "100%" }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Paper
        fullWidth
        sx={{ width: '100%', padding: 2 }}
      >
        <Box>
          <Tabs value={tab} onChange={handleChange} centered variant="fullWidth">
            <Tab label="Projetos" />
            <Tab label="Tarefas" />
          </Tabs>
          <TabPanel value={tab} index={0}>
            {!!projects
              ? (
                <>
                  <Typography textAlign="center" variant="h6">Projetos de Maior Duração</Typography>
                  <DonutChart {...projects} />
                </>
              )
              : (<Typography variant="h6" textAlign="center">Nenhum projeto para ser exibido no período</Typography>)
            }
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {!!tasks
              ? (
                <>
                  <Typography textAlign="center" variant="h6">Tarefas de Maior Duração</Typography>
                  <DonutChart {...tasks} />
                </>
              )
              : (<Typography variant="h6" textAlign="center">Nenhuma tarefa para ser exibida no período</Typography>)
            }
          </TabPanel>
        </Box>
      </Paper>
    </motion.div>
  )
}

export default RankingWidget;