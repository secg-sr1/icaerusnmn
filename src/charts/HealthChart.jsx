import React from 'react';
import ReactEcharts from 'echarts-for-react';

const HealthChart = ({ title, value }) => {
  const color = value < 70 ? '#F87171' : '#ADF802'; // red if unhealthy, green otherwise

  const option = {
    series: [
      {
        name: 'Healthiness',
        type: 'pie',
        radius: ['60%', '75%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '20',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value,
            name: title,
            itemStyle: { color: color },
          },
          {
            value: 100 - value,
            name: '',
            itemStyle: { color: '#808080' },
          },
        ],
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: 200, width: '100%' }} />;
};

export default HealthChart;
