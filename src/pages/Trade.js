import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
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
import TradingViewWidget from '../components/TradingViewWidget';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Copyright from '../components/Copyright';
import getPrice from '../helper/api'
import { addTrade } from '../components/Firebase';
import { useContext } from "react";
import { Context } from "../context/AuthContext";
import {serverTimestamp } from "firebase/firestore";

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

export default function TradePage() {
  const [successfulAction, setSuccessfulAction] = useState(false);
  const [invalidAction, setInvalidAction] = useState(false);
  const [action, setAction] = useState('');
  const {user} = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const amount = data.get('amount');
    const symbol = data.get('symbol');
    getPrice(data.get('symbol'))
    .then((data) => {
     console.log("data", data); 
     if (data.c == "0"){
      console.log("none");
      setInvalidAction(true);
      setSuccessfulAction(false);
     }
     else{
      setSuccessfulAction(true);
      setInvalidAction(false);
      const uid = user.uid;
      console.log(uid);
      const tradeData = {
        action: action,
        stock: symbol,
        amount: amount,
        userID: uid,
        time: serverTimestamp(),
        price: data.c,
      }
      addTrade(user, tradeData);
     }
    })
    .catch((error) => {
      setInvalidAction(true);
      setSuccessfulAction(false);
    })
  };

  const handleChange = (event) => {
    setAction(event.target.value);
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
            Trade
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs = {3}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="symbol"
                label="Stock Symbol"
                name="symbol"
                autoFocus
              
              />
            </Grid>
            <Grid item xs = {3}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="amount"
                label="# Of Shares"
                type="amount"
                id="amount"
              
              />
            </Grid>
            <Grid item xs = {3}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Action</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={action}
                  label="Action"
                  onChange={handleChange}
                >
                  <MenuItem value={"buy"}>Buy</MenuItem>
                  <MenuItem value={"sell"}>Sell</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs = {3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Place Order
            </Button>
            </Grid>
            <Grid item xs = {12}>
              {successfulAction ? <Button variant = "outlined"  sx={{ mt: 1, mb: 3 }}>Order successful.</Button>  : null}
              {invalidAction ? <Button variant = "outlined"  color = "error" sx={{ mt: 1, mb: 3 }}>Something went wrong, please try again.</Button>  : null}
            </Grid>
            
          </Grid>
         
        <TradingViewWidget sx = {{height: '100%'}}></TradingViewWidget>
            </Box>
          
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}