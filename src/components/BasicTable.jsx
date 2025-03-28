import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import RowRadioButtonsGroup from './RowRadioButtonsGroup';

import { useStore } from '../store/useStore';
import { useNavigate, useLocation } from 'react-router-dom';

import api from '../services/api';


function createData(name, selected = false ) {
  return { name, selected };
}

export default function BasicTable({ setSelectedImageId }) {

  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const setDateChange = useStore(state => state.setDateChange);
  const selectedType = useStore(state => state.value);
  const dateChange = useStore(state => state.dateChange);

  

  useEffect(() => {
      api.get('/items/icaerus_flights')
          .then(response => {
              const dates = response.data.data.map(flight => flight.date_flight);
              setRows(dates.map(date => createData(date, date === dateChange)));
          })
          .catch(error => console.error("There was an error fetching the data:", error));
  }, [dateChange]);


  console.log(rows)

  const handleRowClick = (index, date) => {
    setRows(prevRows =>
      prevRows.map((row, i) => ({
        ...row,
        selected: i === index,
        rgbSelected: i === index,
        ndviSelected: false
      }))
    );

    setDateChange(date);

    if (location.pathname.startsWith('/orthomosaic')) {
      navigate(`/orthomosaic/${date}-${selectedType}`, { replace: true });
    } else if (location.pathname.startsWith('/model')) {
      navigate(`/model/${date}-${selectedType}`, { replace: true });
    }
  };

  console.log(rows,'rows')


  return (
    <TableContainer component={Paper} sx={{ 
        maxHeight: 300,
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {width: '5px'},
        '&::-webkit-scrollbar-track': {backgroundColor: 'rgba(0,0,0,0.1)'},
        '&::-webkit-scrollbar-thumb': {backgroundColor: 'rgba(200,200,200,1)'},
     }}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontFamily: 'Manrope, sans-serif', fontWeight: 400}}>Dates</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              onClick={() => handleRowClick(index, row.name)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer',
                backgroundColor: row.selected ? 'rgba(0, 0, 255, 0.2)' : 'inherit',
              }}
            >
              <TableCell component="th" scope="row" sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 200 }}>
                {row.name}
              </TableCell>
              
            </TableRow>
            
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
