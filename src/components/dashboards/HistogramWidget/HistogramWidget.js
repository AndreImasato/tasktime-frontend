import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

// MUI components
import { 
  Card,
  CardHeader,
  CardContent,
  Typography,
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
          {(_.isEmpty(timeData[period]) || _.isEmpty(timeData[period].plot_data.series))
            ? (<Typography variant="h6" sx={{ textAlign: 'center', color: (theme) => theme.palette.grey[600] }}>{"Nenhuma informação disponível"}</Typography>)
            : (<BarChart />)
          }
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default HistogramWidget;