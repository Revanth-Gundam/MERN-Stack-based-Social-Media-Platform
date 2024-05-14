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
import { bgcolor } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api/api';
import axios from 'axios';

const theme = createTheme();


export default function Profile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: '', 
    MiddleName: '',
    LastName: '',
    Email: '',
    UserName: '',
    Age: '',
    Contact_Number: '',
  });

  useEffect(() => {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('authToken');
    api.defaults.headers.common['x-auth-token'] = localStorage.getItem('authToken');

    console.log("token",localStorage.getItem('authToken'))
    api.get('/api/users/')
      .then(res => {
        console.log("user",res.data.UserName)
        setUser(res.data)
      })
      .catch(err => console.error(err));
      
  }, [editMode]);

    const navigate = useNavigate();
    const navToFollowers = () => {
        navigate('/followers');
    }
    const navToFollowing = () => {
        navigate('/following');
    }
    const navToLogin = () => {
      localStorage.removeItem('LoginSuccessful');
      localStorage.removeItem('authToken');
      console.log('logout')
      delete axios.defaults.headers.common['x-auth-token']
      // axios.defaults.headers.common['x-auth-token'] = ""
        navigate('/login');
    }

    const handleInputChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleEditSubmit = e => {
      e.preventDefault();
      api.post('/api/users/edit', formData)
        .then(res => {
          setEditMode(false);
          setUser(res.data);
          // setError(false);
        })
        .catch(err => {
          console.error(err);
          setEditMode(false);
          // setError(true);
          // setErrors(err.response.data.errors)
        });
    };


  const renderProfile = () => (
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
            {/* <LockOutlinedIcon /> */}
          {/* </Avatar> */}
          <Typography component="h1" variant="h5">
            Profile Page
          </Typography>
          <Box sx={{overflow:'auto' , mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ p: 2 }}> Username</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ p: 2 }}>{user.UserName}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
              <Typography sx={{ p: 2 }}> Name</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography sx={{ p: 2 }}> {user.FirstName} {user.MiddleName} {user.LastName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography sx={{ p: 2 }}> Email</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography sx={{ p: 2 }}> {user.Email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography sx={{ p: 2 }}> Age</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography sx={{ p: 2 }}> {user.Age}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography sx={{ p: 2 }}> Mobile</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography sx={{ p: 2 }}> {user.Contact_Number}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Button /*onClick={()}*/
              type="submit"
            //   fullWidth
              variant="contained"
              onClick={navToFollowers}
            //   sx={{ mt: 3, mb: 2 }}
            sx={{ mt: 3, mb: 2 , bgcolor: "green", "&:hover": { bgcolor: 'black'}}}

            >
              Followers {user.Followers ? user.Followers.length : 0}
            </Button>
            </Grid>
            <Grid item xs={12} sm={6}>

            <Button 
              type="submit"
            //   fullWidth
              variant="contained"
              onClick={navToFollowing}
            //   sx={{ mt: 3, mb: 2 }}
            sx={{ mt: 3, mb: 2 , bgcolor: "green", "&:hover": { bgcolor: 'black'}}}

            >
              Following {user.Following ? user.Following.length : 0}
            </Button>
            </Grid>
            <Button
              // type="submit"
              fullWidth
              variant="contained"
            //   sx={{ mt: 3, mb: 2 }}
            sx={{ mt: 3, mb: 2 , bgcolor: "red", "&:hover": { bgcolor: 'yellow'}}}
            onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
            <Button
              type="submit"
              fullWidth
              onClick={navToLogin}
              variant="contained"
              sx={{ mt: 3, mb: 2 , bgcolor: "brown", "&:hover": { bgcolor: 'pink'}}}
            >
              Logout
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

  const renderEditForm = () => (
    <form onSubmit={handleEditSubmit} className="profile-form">
      <label>
        First Name:
        <input type="text" name="FirstName" value={formData.FirstName} onChange={handleInputChange} />
      </label>
      <label>
        Middle Name:
        <input type="text" name="MiddleName" value={formData.MiddleName} onChange={handleInputChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="LastName" value={formData.LastName} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="Email" value={formData.Email} onChange={handleInputChange} />
      </label>
      <label>
        Username:
        <input type="text" name="UserName" value={formData.UserName} onChange={handleInputChange} />
      </label>
      <label>
        Age:
        <input type="number" name="Age" value={formData.Age} onChange={handleInputChange} />
      </label>
      <label>
        Contact Number:
        <input type="tel" name="Contact_Number" value={formData.Contact_Number} onChange={handleInputChange} />
      </label>
      {/* {errors.map(error => (
        <p key={error.param} className="error">{error.msg}</p>
      ))} */}
      {/* {renderErrors()} */}
      <button type="submit" className='submit-button'>Save Changes</button>
      <button type="button" className='cancel-button' onClick={() => setEditMode(false)}>Cancel</button>
    </form>
  );

  return (<>
  <div className="profile-container">
      {/* {editMode ? renderEditForm() : renderProfile()} */}
      {editMode ? renderEditForm() : renderProfile()}
      {/* {renderFollow()} */}
      {/* {renderFollowDisplay()} */}
    </div>
  </>
  );
};