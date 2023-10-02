import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Navbar from '../components/Navbar';
import Copyright from '../components/Copyright';
import { useContext } from "react";
import { Context } from "../context/AuthContext";


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
      
            <Typography variant="h1">Welcome back!</Typography>

        ) : (
          <Typography variant="h1">Welcome, please sign in</Typography>
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