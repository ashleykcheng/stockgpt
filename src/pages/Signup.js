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
import { createNewUser, signInUser } from '../components/Firebase';
import Navbar from '../components/Navbar';
import {useState} from 'react';
import Copyright from '../components/Copyright';
import { useNavigate} from 'react-router-dom';
import { signInWithGoogle } from '../components/Firebase';

const defaultTheme = createTheme();

export default function SignUp() {
  const [invalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createNewUser(data.get('email'), data.get('password'), data.get('firstName'), data.get('lastName'))
    .then((user) => {
        console.log(user);
        navigate('/');
    })
    .catch((errorMessage) =>{
   
      setInvalid(true);
      const message = errorMessage;
      console.log("error: ", message);
      setErrorMessage(message);
    });
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
    .then((user) => {
      console.log(user);
      navigate('/');
    })
    .catch((error) => {
      setInvalid(true);
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
          <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
            Sign up
          </Typography>
          {invalid ? <Button variant = "outlined"  color = "error" sx={{ mt: 1, mb: 1 }}>{errorMessage}</Button> : null}
          <button onClick = {handleSignInWithGoogle} type="button" class="login-with-google-btn"  sx={{ mt: 2 }}>
              Sign in with Google
            </button>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}