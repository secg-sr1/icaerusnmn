import React, { useEffect, useState, useRef } from 'react'

import GradientLineChart from "./GradientLineChart.jsx"
import GradientLineNdvi from "./GradientLineNdvi.jsx"
import PlantHeightChart from "./PlantHeightChart.jsx"


import TemperatureChartB from "./TemperatureChartB.jsx"

import SoilTemperatureChartB from './SoilTemperatureChartB.jsx';
import SoilMoistureChartB from './SoilMoistureChartB.jsx';
import SunlightChartB from './SunlightChartB.jsx';

export default function AnualChart() {

    return <>


            <GradientLineChart />
            <PlantHeightChart />
            <GradientLineNdvi />
            
            
            <TemperatureChartB />
            <SoilTemperatureChartB />
            <SoilMoistureChartB />
            <SunlightChartB />

            
    </>

}