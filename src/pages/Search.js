import Navbar from '../components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TradingViewWidget from '../components/TradingViewWidget';
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Copyright from '../components/Copyright';
const defaultTheme = createTheme();

export default function SearchPage() {
    return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Navbar></Navbar>
        <Container component="main" maxWidth="lg" height="md"  
        sx={{
            marginTop: 10,
            alignItems: 'center',
          }}>
            <TradingViewWidget sx = {{height: '100%'}}></TradingViewWidget>
        </Container>
    </ThemeProvider>
    

    )
}

