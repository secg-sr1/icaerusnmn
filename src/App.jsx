import './App.css'


import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';


import ReportLeaves from './pages/ReportLeaves';
import ReportHealth from './pages/ReportHealth';

import Report from './pages/Report';
import Model from './pages/Model';

import Map from './pages/Map';

function App() {
  

  return (
    <>
      
    <Router>
      <CssBaseline />
      <Routes>
        
        <Route path="/" element={<Navigate replace to="/orthomosaic/2023-04-21-RGB" />} />


        <Route path="/model" element={<Navigate replace to="/model/2023-04-21-RGB" />} />
        <Route path="/model/:dateType" element={<Model />} />

        <Route path="/report-charts" element={<Report />} />
        <Route path="/report-leaves" element={<ReportLeaves />} />
        <Route path="/report-health" element={<ReportHealth />} />


        <Route path="/orthomosaic" element={<Navigate replace to="/orthomosaic/2023-04-21-RGB" />} />
        <Route path="/orthomosaic/:dateType" element={<Map />} />
        {/* <Route path="/map" element={<Map />} /> */}

      </Routes>
    </Router>



    </>
  )
}

export default App
