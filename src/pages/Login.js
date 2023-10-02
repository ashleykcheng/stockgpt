import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../App.css";
import {signInWithGoogle, signInUser} from '../components/Firebase';
import Navbar from '../components/Navbar';
import Copyright from '../components/Copyright';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';



const defaultTheme = createTheme();

export default function LoginPage() {
  const [invalidLogin, setInvalidLogin] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInUser(data.get('email'),data.get('password'))
    .then((user) => {
      console.log(user);
      navigate('/');
    })
    .catch((error) => {
      setInvalidLogin(true);
    })
  };
  const handleSignInWithGoogle = () => {
    signInWithGoogle()
    .then((user) => {
      console.log(user);
      navigate('/');
    })
    .catch((error) => {
      setInvalidLogin(true);
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar></Navbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {invalidLogin ? <Button variant = "outlined"  color = "error" sx={{ mt: 1 }}>Invalid Login</Button>  : null}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <button onClick = {handleSignInWithGoogle} type="button" class="login-with-google-btn" >
              Sign in with Google
            </button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="./Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}