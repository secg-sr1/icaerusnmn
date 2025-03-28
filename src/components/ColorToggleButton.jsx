import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore.jsx';

export default function ColorToggleButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const setTabChange = useStore(state => state.setTabChange);

  const getAlignmentFromPath = (path) => {
    if (path.includes('/report-charts')) return 'charts';
    if (path.includes('/report-leaves')) return 'leaves';
    if (path.includes('/report-health')) return 'health';
    return 'charts'; // default value
  };

  const [alignment, setAlignment] = useState(getAlignmentFromPath(location.pathname));

  useEffect(() => {
    setAlignment(getAlignmentFromPath(location.pathname));
  }, [location.pathname]);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setTabChange(newAlignment);

      if (newAlignment === 'charts') navigate('/report-charts');
      else if (newAlignment === 'leaves') navigate('/report-leaves');
      else if (newAlignment === 'health') navigate('/report-health');
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{
        backgroundColor:'rgba(255, 255, 255, 0.29)',
        borderRadius:0
      }}
    >
      <ToggleButton value="charts" sx={{ fontFamily: 'manrope' }}>charts</ToggleButton>
      <ToggleButton value="leaves" sx={{ fontFamily: 'manrope' }}>leaves</ToggleButton>
      <ToggleButton value="health" sx={{ fontFamily: 'manrope' }}>health</ToggleButton>
    </ToggleButtonGroup>
  );
}
