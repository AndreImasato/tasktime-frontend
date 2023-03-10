import React from 'react';
import ReactApexChart from 'react-apexcharts';

// MUI imports
import { useTheme } from '@mui/material/styles';

// Custom imports
import Utils from 'src/utils';

const DonutChart = (props) => {
  const { series, labels } = props;
  const theme = useTheme();
  
  const options = {
    chart: {
      height: '100%',
      type: 'donut',
    },
    labels: labels,
    dataLabels: {
      enabled: false,
    },
    theme: {
      monochrome: {
        color: theme.palette.primary.main,
      },
    },
    legend: {
      show: false
    },
    tooltip: {
      y: {
        formatter: (val) => {
          return Utils.parseTimeIntervalToString(val);
        },
        title: {
          formatter: (seriesName) => {
            return seriesName;
          }
        }
      }
    }
  };
  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type={options.chart.type}
        height={options.chart.height}
      />
    </div>
  )
}

export default DonutChart;