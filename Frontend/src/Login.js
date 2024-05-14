// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import { useState } from 'react';
import axios from 'axios';
import api from './api/api.js';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useEffect, useState  } from 'react';
import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);

  const [values, setValues] = useState({
    UserName: '',
    Password: '',
  });

  const [values2, setValues2] = useState({
    FirstName: '',
    LastName: '',
    MiddleName: '',
    Age: '',
    Email: '',
    Contact_Number: '',
    UserName: '',
    Password: '',
  });

  const handleChange = (field) => (event) => {
    setValues({
      ...values,
      [field]: event.target.value,
    });
  };

  const handleChange2 = (field) => (event) => {
    setValues2({
      ...values2,
      [field]: event.target.value,
    });
  };

  const allFieldsHaveValue = Object.values(values).every(Boolean);
  // const navToProfile = () => {
  //   navigate('/profile');
// }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("values", values);
      const response = await api.post("/api/authentication/Login", values);

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("LoginSuccessful", "true");
      axios.defaults.headers.common['x-auth-token'] = response.data.token;
      console.log("authToken", response.data.token);
      // console.log("authToken", response.data.token);
      
      // const redirect = location.state?.from.pathname || '/';
      navigate("/Profile");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit_SignUp = async (event) => {
    event.preventDefault();
    try {
      console.log("values2", values2);
      const response = await api.post("/api/authentication/SignUp", values2);

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("LoginSuccessful", "true");
      axios.defaults.headers.common['x-auth-token'] = response.data.token;
      console.log("authToken", response.data.token);
      
      // const redirect = location.state?.from.pathname || '/';
      navigate("/Profile");
    } catch (err) {
      console.error(err);
    }
  };



  if (login) {
  return (
    <ThemeProvider theme={theme}>
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={values.UserName}

              onChange={handleChange('UserName')}
              id="UserName"
              label="UserName"
              name="UserName"
              autoComplete="UserName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={values.Password}
              onChange={handleChange('Password')}
              name="Password"
              label="Password"
              type="Password"
              id="Password"
              autoComplete="current-Password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              disabled={!allFieldsHaveValue}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Grid> */}
              <Grid item>
              <Button onClick={() => setLogin(false)}
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
                {/* <Link href="#" variant="body2"> */}

                  Sign Up
                {/* </Link> */}
                </Button>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

else{
  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit_SignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={values2.FirstName}
                  onChange={handleChange2('FirstName')}
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
                  // autoComplete="given-name"
                  name="middleName"
                  value={values2.MiddleName}
                  onChange={handleChange2('MiddleName')}
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  value={values2.LastName}
                  onChange={handleChange2('LastName')}
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
                  value={values2.Email}
                  onChange={handleChange2('Email')}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Age"
                  value={values2.Age}
                  onChange={handleChange2('Age')}
                  label="Age"
                  type="Age"
                  id="Age"
                  // autoComplete="new-Password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Mobile Number"
                  value={values2.Contact_Number}
                  onChange={handleChange2('Contact_Number')}
                  label="Mobile Number"
                  type="Mobile Number"
                  id="Mobile Number"
                  // autoComplete="new-Password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="UserName"
                  value={values2.UserName}
                  onChange={handleChange2('UserName')}
                  label="UserName" 
                  type="UserName"
                  id="UserName"
                  // autoComplete="new-Password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  value={values2.Password}
                  onChange={handleChange2('Password')}
                  label="Password"
                  type="Password"
                  // id="Password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // sx={{ mt: 3, mb: 2 , backgroundColor: "red"}}

            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Button onClick={() => setLogin(true)}
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {/* sx={{ mt: 3, mb: 2 , bgcolor: "brown"}}> */}

                {/* <Link href="#" variant="body2"> */}
                

                  Login
                {/* </Link> */}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
}
