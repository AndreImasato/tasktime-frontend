import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import ReactApexChart from 'react-apexcharts';

const BarChart = (props) => {
  const { timeData, period } = useSelector(({ dashboards }) => dashboards.histogram);
  const [series, setSeries] = useState({});
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (!_.isEmpty(timeData[period])){
      const { plot_data } = timeData[period];

      //TODO deals with category depending on the selected period
      //TODO if week, then name of the days of the week
      //TODO if month, then format days to pt-br format
      //TODO if year, format to months names
      //TODO formats interval duration
      const newOptions = {
        chart: {
          height: "100%",
          type: 'bar',
        },
        plotOptions: {
          bar: {
            columnWidth: "90%",
            horizontal: false
          }
        },
        xaxis: {
          categories: plot_data.xaxis
        },
        fill: {
          opacity: 1
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        }
      };
      setOptions(newOptions);

      const newSeries = [{
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