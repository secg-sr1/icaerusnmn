import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

import api from '../services/api'; // ✅ import your service

const GradientLineChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ use api.get instead of fetch
        const response = await api.get('/assets/6f73221f-78db-4950-b441-48b6b30b611f.json');
        setChartData(response.data); // since axios auto-parses JSON
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch percentage data:', error);
      }
    };

    fetchData();
  }, []);

  const dates = chartData.map((item) => item.date);
  const values = chartData.map((item) => item.percentage);

  const option = {
    title: {
      text: 'Healthiness Percentage Over Time',
      left: 'center',
      top: '0',
      textStyle: {
        fontSize: 20,
        fontFamily: 'manrope',
        fontWeight: 200,
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let tooltipContent = `<div>${params[0].axisValue}</div>`;
        params.forEach((item) => {
          tooltipContent += `<div>
            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgb(0, 123, 255);"></span>
            ${item.seriesName}: ${item.data.toFixed(2)}%
          </div>`;
        });
        return tooltipContent;
      },
      textStyle: {
        fontSize: 12,
        fontFamily: 'manrope',
        fontWeight: 200,
        color: '#333',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
      axisLabel: {
        textStyle: {
          fontSize: 10,
          fontFamily: 'manrope',
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} %',
        textStyle: {
          fontSize: 10,
          fontFamily: 'manrope',
        },
      },
    },
    series: [
      {
        name: 'Healthiness',
        type: 'line',
        smooth: false,
        lineStyle: {
          color: 'rgb(173, 248, 2)',
          width: 2,
        },
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: 'rgb(173, 248, 2)',
        },
        areaStyle: {
          opacity: 0.3,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(173, 248, 2)' },
            { offset: 1, color: 'rgba(0, 0, 0)' },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: values,
      },
    ],
  };

  return (
    <div style={{ paddingTop: 10 }}>
      <ReactEcharts option={option} style={{ height: 400, width: '100%' }} />
    </div>
  );
};

export default GradientLineChart;
