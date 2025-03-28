import React,  { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Grid, Paper, CardMedia, CardContent, Typography, Tooltip, IconButton } from '@mui/material';

import { createTheme } from '@mui/material/styles';



export default function DataViz( {darkMode} ) {
    const [ moreVertOptionsOpen, setMoreVertOptionsOpen ] = useState(false);

    const handleClick = () => {
        setMoreVertOptionsOpen(prevState => !prevState);;
    }

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary:{
                main: darkMode ? '#BFBFBF' : '#141414'
            }
        },
        background: {
            default: {
                default: darkMode ? '#121212' : '#fff'
            }
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 834, 
                md: 1080,
                lg: 1920,
                xl: 2060
            }
        }
    })

    return <>

        <ThemeProvider theme={theme}>
            <CssBaseline>

                <Box sx={{height:'77vh'}}>

                    { moreVertOptionsOpen == true &&
                        <div style={{position:'absolute', top:'20%', left:'6.5%', width:'19%', zIndex:999}}>
                        </div>
                    
                    }


                    <Box sx={{
                        height:'72vh',
                        overflowX:'auto',
                        '&::-webkit-scrollbar':{
                            width: '5px',
                            height:'5px'
                        },
                        '&::-webkit-scrollbar-track':{
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        },
                        '&::-webkit-scrollbar-thumb':{
                            backgroundColor: darkMode ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)',
                            '&:hover':{
                                backgroundColor: darkMode ? 'rgba(255,255,255,3)' : 'rgba(0,0,0,3)'
                            },
                        }
                    }}>
                        {/* <ImageCollection darkMode={darkMode} /> */}
                        {/* <AnualChart darkMode={darkMode} /> */}
                    </Box>


                    

                </Box>

            </CssBaseline>
        </ThemeProvider>
    
    </>


}