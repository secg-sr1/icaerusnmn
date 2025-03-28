import React from 'react';
import ReactEcharts from 'echarts-for-react'
import * as echarts from 'echarts'


const PlantHeightChart = () => {

    const dataDict = [{date:'2023-04-21',healthiness:'87',ndvi:'0.62',height:'1.68',temperature:'23',humidity:'90'},{date:'2023-04-28',healthiness:'74',ndvi:'0.8',height:'1.17',temperature:'20',humidity:'83'},{date:'2023-05-05',healthiness:'66',ndvi:'0.91',height:'0.83',temperature:'18',humidity:'78'},{date:'2023-05-18',healthiness:'94',ndvi:'0.86',height:'1.98',temperature:'25',humidity:'94'},{date:'2023-05-26',healthiness:'64',ndvi:'0.78',height:'0.75',temperature:'18',humidity:'77'},{date:'2023-06-09',healthiness:'71',ndvi:'0.95',height:'1.03',temperature:'19',humidity:'81'},{date:'2023-07-28',healthiness:'88',ndvi:'0.69',height:'1.72',temperature:'23',humidity:'90'}]

    const dates = dataDict.map(dateData => dateData.date)

    const values = dataDict.map(valuesData => valuesData.height)

    const option = {
        title: {
            text: 'Plant Height Meters',
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
                  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${"rgb(0, 255, 96)"};"></span>
                  ${item.seriesName}: ${item.data}
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
        yAxis:{
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
                name: 'Height',
                type: 'line',
                smooth: false, 
                lineStyle: {
                    color: 'rgb(0, 255, 96)',
                    width: 2,
                },
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: 'rgb(0, 255, 96)', 
                }, 
                areaStyle: {
                    opacity: 0.5, 
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0, 
                            color: 'rgb(0, 255, 96)',
                        },
                        {
                            offset: 1, 
                            color: 'rgb(0, 0, 0)',
                        },
                    ]),
                },
                emphasis: {
                    focus: 'series',
                },
                data: values
            },
            
        ]
    }



    
    return  <ReactEcharts option={option} style={{ height: 400, width: '100%' }} />



}

export default PlantHeightChart;