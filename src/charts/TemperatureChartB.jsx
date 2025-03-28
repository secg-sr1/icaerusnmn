import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

const TemperatureChartB = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'api/assets/6fea8482-2720-45c8-b605-d3a9440116fe.json'
        );
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const dates = chartData.map((item) => item.date);
  const values = chartData.map((item) => item.values['air-temperature']);

  const option = {
    title: {
        text: 'Daily Air Temperature',
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
            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgb(173, 248, 2);"></span>
            ${item.seriesName}: ${item.data.toFixed(2)}
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
            rotate: 0, // rotates the labels 45 degrees
            textStyle: {
            fontSize: 10,
            fontFamily: 'manrope'
            },
        },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        textStyle: {
        fontSize: 10,
        fontFamily: 'manrope'
        },
    },
    },
    series: [
      {
        name: 'Air Temperature',
        type: 'line',
        smooth: false,
        lineStyle: {
          color: 'rgb(173, 248, 2)',
          width: 2,
        },
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: 'rgb(173, 248, 2)',
        },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(173, 248, 2)' },
            { offset: 1, color: 'rgb(0, 0, 0)' },
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
    <div style={{ paddingTop: 10}}>
      <ReactEcharts option={option} style={{ height: 400, width: '100%' }} />
    </div>
  );
};

export default TemperatureChartB;
