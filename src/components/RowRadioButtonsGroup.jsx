import * as React from 'react';
import { useState, useRef } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useStore } from '../store/useStore.jsx';
import { Switch } from '@mui/material';



import { useNavigate } from 'react-router-dom';


export default function RowRadioButtonsGroup() {

  const navigate = useNavigate();
  const dateChange = useStore(state => state.dateChange);
  const setValue = useStore(state => state.setValue);

  const [selectRadio, setSelectRadio] = useState('RGB')

  // Track explicitly user-initiated changes
  const userInitiated = useRef(false);

  const showTrace = useStore(state => state.showTrace);
  const setShowTrace = useStore(state => state.setShowTrace);

  const showLabels = useStore(state => state.showLabels);
  const setShowLabels = useStore(state => state.setShowLabels);

  const handleRadioChange = (event) => {
    const type = event.target.value;

    userInitiated.current = true; 
    setValue(type);

    if (location.pathname.startsWith('/orthomosaic')) {
      navigate(`/orthomosaic/${dateChange}-${type}`, { replace: true });
    } else if (location.pathname.startsWith('/model')) {
      navigate(`/model/${dateChange}-${type}`, { replace: true });
    }
  };


    const handleLabelsToggle = (event) => {
      setShowLabels(event.target.checked)
    }

  const handleTraceToggle = (event) => {
    setShowTrace(event.target.checked)
  }


  return (
    <FormControl sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 200 }}> 
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ fontFamily:'monrope', display:'flex' }}
        defaultValue="RGB"
        onChange={handleRadioChange}
      >
        <FormControlLabel 
           sx={{
            '& .MuiFormControlLabel-label': {
              fontFamily: 'Manrope, sans-serif', fontWeight: 200,
            },
          }}
        value="RGB" control={<Radio />} label="RGB" />
        <FormControlLabel 
          sx={{
            '& .MuiFormControlLabel-label': {
              fontFamily: 'Manrope, sans-serif', fontWeight: 200,
            },
          }}
        value="NDVI" control={<Radio />} label="NDVI" />
        <FormControlLabel value="NIR" control={<Radio />} label="NIR" />

          <FormControlLabel value="Labels" control={<Switch color="error" checked={showLabels} onChange={handleLabelsToggle} />} 
            label="Labels"
          />

          <FormControlLabel value="Trace" control={<Switch color="error" checked={showTrace} onChange={handleTraceToggle} />} 
            label="Trace"
          />
      
      </RadioGroup>
    </FormControl>
  );
}
