import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

// Custom imports
import Utils from 'src/utils';

const BarChart = (props) => {
  const { timeData, period } = useSelector(({ dashboards }) => dashboards.histogram);
  const [series, setSeries] = useState({});
  const [options, setOptions] = useState({});

  const formatXLabels = (value) => {
    switch (period){
      case 'year':
        return Utils.capitalizeFirstLetter(moment(value, 'MM').format('MMM'));
      default:
        // week and month
        return moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
  }

  useEffect(() => {
    if (!_.isEmpty(timeData[period])){
      const { plot_data } = timeData[period];

      const newOptions = {
        chart: {
          height: "100%",
          type: 'bar',
        },
        plotOptions: {
          bar: {
            columnWidth: "25%",
            horizontal: false,
            borderRadius: 5,
            dataLabels: {
              position: 'top',
            },
          }
        },
        xaxis: {
          categories: plot_data.xaxis,
          axisBorder: {
            show: false,
          },
          labels: {
            show: true,
            formatter: formatXLabels
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: (val) => {
              return Utils.parseTimeIntervalToString(val);
            }
          },
        },
        fill: {
          opacity: 1
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => {
            return Utils.parseTimeIntervalToString(val);
          },
          offsetY: -20,
          style: {
            fontSize: 12,
            colors: ['#304758']
          }
        }
      };
      setOptions(newOptions);

      const newSeries = [{
        name: "Tempo de Atividade",
        data: plot_data.series
      }]
      setSeries(newSeries);
    }
  }, [timeData, period]);

  if (_.isEmpty(timeData[period]) || _.isEmpty(series) || _.isEmpty(options)){
    return null;
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type={options.chart.type}
      height={options.chart.height}
    />
  )
}

export default BarChart;