import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar';
import Copyright from '../components/Copyright';
import { useContext } from "react";
import { Context } from "../context/AuthContext";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function App() {
  const {user} = useContext(Context);
  console.log(user);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Navbar></Navbar>
        <Container component="main" sx={{ mt: 10, mb: 2 }} maxWidth="sm">
        {user ? (
      
      <div>
      <Typography variant="h2" gutterBottom>
        Welcome Back!
      </Typography>
      <Typography variant="body1" paragraph>
        You are now signed in, and have full access to StockGPT.
      </Typography>
      <Typography variant="body2" paragraph>
        Discover the latest market trends and trading opportunities.
      </Typography>
    
      <Button variant="contained" color="primary">
        <Link to ="/dashboard" style={{ color: 'inherit', textDecoration: 'inherit'}}>Start Trading Now</Link>
      </Button>
    </div>

        ) : (
          <div>
            <Typography variant="h2" gutterBottom>
              Welcome! Please sign in to get started.
            </Typography>
            <Typography variant="body1" paragraph>
              It's just you, the stock market, and $10,000. And a pretty intelligent helper. How far can you get?
            </Typography>
          </div>
        )}
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
            
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}