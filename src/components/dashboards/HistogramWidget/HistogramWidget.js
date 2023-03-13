import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

// MUI components
import { 
  Box,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Tabs,
  Tab
} from '@mui/material';

// Reducers
import { setPeriod } from 'src/store/slices/dashboards/histogramSlice';

// Custom imports
import BarChart from './BarChart';
import PeriodComparison from './PeriodComparison';




const HistogramWidget = (props) => {
  const { timeData, period } = useSelector(({ dashboards }) => dashboards.histogram);
  const dispatch = useDispatch();

  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card
        sx={{ width: "100%", padding: 2, height: 420 }}
      >
        <CardHeader
          title={<Typography variant="h6">Acompanhamento Tempos</Typography>}
          subheader={"Baseado no período selecionado"}
          action={
            <Tabs
              value={period}
              onChange={(ev, value) => {
                dispatch(setPeriod(value));
              }}
              centered
            >
              <Tab value="week" label="Semana" />
              <Tab value="month" label="Mês" />
              <Tab value="year" label="Ano" />
            </Tabs>
          }
        />
        <CardContent
          sx={{ height: "80%" }}
        >
          <PeriodComparison />
          <BarChart />
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default HistogramWidget;