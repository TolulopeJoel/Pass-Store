import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/register/", {
        email,
        password,
        username,
        last_name: lastName,
        first_name: firstName,
        password2: password2,
      });
      navigate("/signin");
    } catch (error) {
      if (error.response.data.detail) {
        setError([error.response.data.detail]);
      } else if (error.response.data.message) {
        setError([error.response.data.message]);
      } else if (error.response.data.non_field_errors) {
        setError(error.response.data.non_field_errors);
      } else {
        setError(['An error occurred. Please try again later.']);
      }
      console.log(error.response.data);
      setError(error.response.data);
    }
  }
  // catch (error) {
  //   if (error.response.data.detail) {
  //     setError([error.response.data.detail]);
  //   } else if (error.response.data.message) {
  //     setError([error.response.data.message]);
  //   } else if (error.response.data.non_field_errors) {
  //     setError(error.response.data.non_field_errors);
  //   } else {
  //     setError(['An error occurred. Please try again later.']);
  //   }
  // }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {error.first_name && (<div className="text-danger w-100">{error.first_name}</div>)}
                <TextField required fullWidth label="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                {error.last_name && (<div className="text-danger w-100">{error.last_name}</div>)}
                <TextField required fullWidth label="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              </Grid>
              <Grid item xs={12}>
                {error.username && (<div className="text-danger w-100">{error.username}</div>)}
                <TextField required fullWidth label="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
              </Grid>
              <Grid item xs={12}>
                {error.email && (<div className="text-danger w-100">{error.email}</div>)}
                <TextField required fullWidth label="Email Address" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </Grid>
              <Grid item xs={12}>
                {error.password && (<div className="text-danger w-100">{error.password}</div>)}
                <TextField required fullWidth label="Password" type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              </Grid>
              <Grid item xs={12}>
                {error.password2 && (<div className="text-danger w-100">{error.password2}</div>)}
                <TextField required fullWidth label="Confirm Password" type="password" id="password2" value={password2} onChange={(event) => setPassword2(event.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration and updates via email." />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Sign Up </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
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