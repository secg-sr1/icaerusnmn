import React, { useState, useEffect } from 'react';
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

import ControlledAccordions from '../components/ControlledAccordion';
import RightBar from '../components/RightBar';
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore';



import Scene from './Scene';

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
            { title: 'Orthomosaic', icon: <GradientIcon />, link: '/orthomosaic' },
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
  const targetText = "MODEL";
  const scrambledChars = "%#$+%";
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


export default function Model() {
    const [darkMode, setDarkMode] = useState(false);

    const { dateType } = useParams();
    const navigate = useNavigate();
    const setDateChange = useStore(state => state.setDateChange);
    const setValue = useStore(state => state.setValue);
    const dateChange = useStore(state => state.dateChange);
    const selectedType = useStore(state => state.value);


    useEffect(() => {
        console.log('URL Param (dateType):', dateType);
        console.log('Zustand:', dateChange, selectedType);
      
        if (dateType) {
          const parts = dateType.split('-');
          const type = parts.pop();         // "RGB", "NDVI", or "NIR"
          const date = parts.join('-');     // "2023-04-21"
      
          console.log('Parsed URL:', date, type);
      
          if (!date || !['RGB', 'NDVI', 'NIR'].includes(type)) {
            console.log('Invalid URL params, navigating to default...');
            navigate('/model/2023-04-21-RGB', { replace: true });
          } else if (date !== dateChange || type !== selectedType) {
            console.log('Updating Zustand from URL params...');
            setDateChange(date);
            setValue(type);
          }
        }
      }, [dateType]);
      
      useEffect(() => {
        const desiredUrl = `/model/${dateChange}-${selectedType}`;
        if (desiredUrl !== `/model/${dateType}`) {
          console.log('Navigating from Zustand state:', desiredUrl);
          navigate(desiredUrl, { replace: true });
        }
      }, [dateChange, selectedType]);


    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: { main: darkMode ? '#BFBFBF' : '#020812' }
        },
        breakpoints: {
            values: { xs: 0, sm: 834, md: 1080, lg: 1920, xl: 2060 }
        }
    });

    const data = [
        { label: 'PROJECT PROCESS', value: 80 },
        { label: 'SQM PRODUCED', value: 24 },
        { label: 'SQM SHIPPED', value: 9 },
        { label: 'MISSING SQM', value: 278 },
        { label: 'KG SHIPPED', value: 164 }
    ];


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
                                <Typography variant='h4' sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>{new Date().toLocaleDateString('en-GB')}</Typography>
                            </Paper>



                            <Grid item xs={12} sm={12} sx={{height:'100%', border: '1px solid grey' }}>
                                <Scene darkmode={darkMode} />
                            </Grid>


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
