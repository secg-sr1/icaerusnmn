import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    CssBaseline,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Tooltip,
    Typography,
    ThemeProvider,
    createTheme,
    Stack,
    Container,
    Grid,
    TextField
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import AppBarLayout from '../components/AppBar';
import {
    AppRegistration as AppRegistrationIcon,
    AccountTree as AccountTreeIcon,
    PrecisionManufacturing as PrecisionManufacturingIcon,
    Leaderboard as LeaderboardIcon,
    ThreeDRotation as ThreeDRotationIcon
} from '@mui/icons-material';

import GradientIcon from '@mui/icons-material/Gradient';
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";


import ColorToggleButton from '../components/ColorToggleButton';

import ControlledAccordions from '../components/ControlledAccordion';
import RightBar from '../components/RightBar';

import { useStore } from '../store/useStore';
import { useParams, useNavigate } from 'react-router-dom';

import MapWithTiles from './MapWithTiles';

const SidebarButton = ({ title, icon, link }) => (
    <ListItem disablePadding>
        <ListItemButton sx={{ justifyContent: 'center' }} href={link}>
            <Tooltip title={title} placement='right'>
                <IconButton
                    aria-label={title}
                    size='large'
                    sx={{ borderRadius: '50%', border: '1px solid', borderColor: 'divider', boxShadow: 3 }}
                >
                    {icon}
                </IconButton>
            </Tooltip>
        </ListItemButton>
    </ListItem>
);

const SidebarContent = () => (
    <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
        {[
            { title: 'OrthomosaicMap', icon: <GradientIcon />, link: '/orthomosaic' },
            { title: 'Model', icon: <ThreeDRotationIcon />, link: '/model' },
            { title: 'Report', icon: <AssessmentOutlinedIcon />, link: '/report-charts' },
        ].map((item, index) => (
            <SidebarButton key={index} {...item} />
        ))}
    </List>
);

const Counter = ({ endValue }) => {
    const [count, setCount] = useState(0);


    useEffect(() => {
        let start = 0;
        const duration = 500; // 1 second
        const increment = endValue / (duration / 16);

        const interval = setInterval(() => {
            start += increment;
            if (start >= endValue) {
                setCount(endValue);
                clearInterval(interval);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(interval);
    }, [endValue]);

    return <>{count}</>;
};


const TypingEffect = () => {
  const targetText = "MAP";
  const scrambledChars = "g3&";
  const [displayText, setDisplayText] = useState(scrambledChars);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText((prevText) => {
        const newText = prevText
          .split("")
          .map((char, index) => (index <= currentIndex ? targetText[index] : char))
          .join("");
        return newText;
      });
      currentIndex++;
      if (currentIndex >= targetText.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <Typography variant="h4" sx={{ fontFamily: "Manrope, sans-serif", fontWeight: 200 }}>
      {displayText}
    </Typography>
  );
};

export default function Map() {
    const [darkMode, setDarkMode] = useState(false);

    const [selectedImageId, setSelectedImageId] = useState(null); 

    const { dateType } = useParams();
    const navigate = useNavigate();

    const setDateChange = useStore(state => state.setDateChange);
    const setValue = useStore(state => state.setValue);
    const dateChange = useStore(state => state.dateChange);
    const selectedType = useStore(state => state.value);

    // Ref to track initial render
    const initialRender = useRef(true);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: { main: darkMode ? '#BFBFBF' : '#020812' }
        },
        breakpoints: {
            values: { xs: 0, sm: 834, md: 1080, lg: 1920, xl: 2060 }
        }
    });

    useEffect(() => {
        if (dateChange && selectedType) {
          const formattedDate = dateChange.replaceAll('-', '').slice(2); // e.g. "2024-05-10" → "240510"
          let tileId = `CROPPED_ORTHOMOSAIC_${formattedDate}`;
      
          if (selectedType === 'NDVI' || selectedType === 'NIR') {
            tileId += `_${selectedType}`;
          }
      
          setSelectedImageId(tileId);
        }
      }, [dateChange, selectedType]);

    useEffect(() => {
        if (dateType) {
        const parts = dateType.split('-');
        const type = parts.pop();       // RGB, NDVI, NIR
        const date = parts.join('-');   // e.g., 2023-04-21
    
        if (!date || !['RGB', 'NDVI', 'NIR'].includes(type)) {
            navigate('/orthomosaic/2023-04-21-RGB', { replace: true });
        } else if (date !== dateChange || type !== selectedType) {
            setDateChange(date);
            setValue(type);
        }
        }
        initialRender.current = false;
    }, [dateType]);
    
    useEffect(() => {
        if (!initialRender.current) {
        const desiredUrl = `/orthomosaic/${dateChange}-${selectedType}`;
        if (desiredUrl !== `/orthomosaic/${dateType}`) {
            navigate(desiredUrl, { replace: true });
        }
        }
    }, [dateChange, selectedType]);


    console.log(selectedType, 'SelectedMap from MAP')
    console.log(selectedImageId, 'SelectedImageID')





    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <AppBarLayout darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Box sx={{ display: 'flex', flexGrow: 1, mt: 0 }}> {/* Ensure no gap */}
                        <Box sx={{ width: 80, bgcolor: darkMode ? 'grey.900' : 'grey.100', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0, height: '100vh' }}>
                            <SidebarContent />
                        </Box>
                        <Container disableGutters sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, borderRadius: 0, boxShadow: 3, mb: 0, border: '1px solid grey' }}>
                                <Typography variant='h4' sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 200 }}><TypingEffect /></Typography>
                                <Typography variant='h4' sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 200 }}>Leaves and Sensors</Typography>
                            </Paper>
                        <Box sx={{
                            height: '78vh',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            '&::-webkit-scrollbar': { width: '5px' },
                            '&::-webkit-scrollbar-track': { backgroundColor: 'rgba(0,0,0,0.1)' },
                            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(200,200,200,1)' },
                            borderRight:'1px solid grey',
                            borderLeft:'1px solid grey'
                        }}>
                            <Box sx={{ height: '100%' }}>
                                <MapWithTiles tileId={selectedImageId} darkMode={darkMode} />
                            </Box>
                        </Box>

                        <div style={{position:'absolute', top:'25%', left:'6%', width:'19%', zIndex:999}}>
                            <ControlledAccordions darkMode={darkMode} />
                        </div>
                        
                        <div style={{position:'absolute', top:'40%', right:'2%', width:'8%', height:'500px', zIndex:999}}>
                            <RightBar />
                        </div>

                        </Container>
                    </Box>
                </Box>
            </LocalizationProvider>
        </ThemeProvider>
    );
}
