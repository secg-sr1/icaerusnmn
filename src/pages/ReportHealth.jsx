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

import ColorToggleButton from '../components/ColorToggleButton';
import ChartsCollection from '../datavizualization/ChartsCollection';

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
  const targetText = "REPORT";
  const scrambledChars = "g3&+F~#";
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

export default function ReportHealth() {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: { main: darkMode ? '#BFBFBF' : '#020812' }
        },
        breakpoints: {
            values: { xs: 0, sm: 834, md: 1080, lg: 1920, xl: 2060 }
        }
    });

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
                                {/* <Typography variant='h4' sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>{new Date().toLocaleDateString('en-GB')}</Typography> */}
                                <Typography variant='h4' sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 200 }}>Healthiness</Typography>
                            </Paper>

                            {/* <Stack spacing={2} sx={{ mt: 0, border: '1px solid grey', pt:1, height:'80vh', backgroundColor: darkMode ? '#020812' : '#FFFFFF' }}>
                                <ImageCollection />

                                                               

                                <ChartsCollection />


                                <ColorToggleButton /> 
                            </Stack>
                             */}
                             <Box sx={{
                                height: '69vh',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                '&::-webkit-scrollbar': { width: '5px' },
                                '&::-webkit-scrollbar-track': { backgroundColor: 'rgba(0,0,0,0.1)' },
                                '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(200,200,200,1)' },
                                borderRight:1,
                                borderLeft: '1px solid grey'
                            }}>
                                <Box sx={{ height: '100%' }}>
                                    <ChartsCollection />
                                </Box>
                            </Box>


                            <Box sx={{
                                position: 'sticky',
                                top: 0,
                                zIndex: 1000,
                                py: 1,
                                borderBottom: '1px solid grey',
                                display: 'flex',
                                justifyContent: 'center',
                                borderRight: '1px solid lightgrey',
                                borderLeft: '1px solid grey'
                            }}>
                                <ColorToggleButton />
                            </Box>
                            
                            

                        </Container>
                    </Box>
                </Box>
            </LocalizationProvider>
        </ThemeProvider>
    );
}
