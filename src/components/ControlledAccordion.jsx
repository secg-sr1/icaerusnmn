import * as React from 'react';

import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import RowRadioButtonsGroup from './RowRadioButtonsGroup.jsx';
import BasicTable from './BasicTable.jsx';


export default function ControlledAccordions({ darkMode, setSelectedImageId }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{border:0, borderRadius:0}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          
          <Typography sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 200 }}>Day Selection</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          <BasicTable setSelectedImageId={ setSelectedImageId } />
        </AccordionDetails>
        <AccordionDetails>
          <RowRadioButtonsGroup />
        </AccordionDetails>
      </Accordion>
      
    </Box>
  );
}
