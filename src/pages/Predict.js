import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import DashboardDrawer from '../components/DashboardDrawer';
import { useState } from 'react';
import Copyright from '../components/Copyright';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const defaultTheme = createTheme();

export default function PredictPage() {
  const [invalidAction, setInvalidAction] = useState(false);
  const serverUrl = 'http://localhost:3000';
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/scrape') 
    .then((response) => response.json()) 
    .then((data) => {
      this.setState({ scrapeResult: data });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar variant = "permanent">
        <Navbar></Navbar>
        </AppBar>
        <DashboardDrawer />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
             <Typography component="h1" variant="h5">
            Predict
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs = {9}>
              <TextField
                margin="normal"
                
                fullWidth
                id="symbol"
                label="Website"
                name="symbol"
                autoFocus
              
              />
            </Grid>
            
            <Grid item xs = {3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                Analyze
            </Button>
            </Grid>
            <Grid item xs = {12}>
              {invalidAction ? <Button variant = "outlined"  color = "error" sx={{ mt: 1, mb: 3 }}>Something went wrong, please try again.</Button>  : null}
            </Grid>
            
          </Grid>
            </Box>
          
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}