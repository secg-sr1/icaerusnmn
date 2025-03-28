import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

export default function AppBarLayout({ darkMode, setDarkMode }){

    return <AppBar position="static" sx={{bgcolor:'#000000'}}>
            <Toolbar>
                <Typography
                    variant="h4"
                    sx={{
                        flexGrow: 1,
                        fontSize: {
                            xs: '1.2rem',
                            sm: '1.25rem',
                            md: '1.5rem',
                        },
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 200
                    }}
                >
                    ICAERUS
                </Typography>

                <Typography
                    sx={{
                        fontSize: {
                            xs: '0.5rem',
                            sm: '0.75rem',
                            md: '0.75rem',
                        },
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 200, 
                        pr: 1
                    }}
                >
                    Powered by noumena
                </Typography>
                <img src="/Noumena_logo_squared.png" alt="NMN Logo" style={{maxHeight:40}} />
                <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="secondary" />
                
            </Toolbar>
    </AppBar>


}