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
import api from './api/api';
import axios from 'axios';
import { useState, useEffect } from 'react';



export default function Followers() {
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const navToProfile = () => {
        navigate('/profile');

    }
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

    const removeFollowing = async (following) => {
        console.log("remove following",following)
        await api.post("/api/following/remove/" + following.userid)
        .then(res => {
            setUser(res.data);
        })
        .catch(err =>
            {
                console.error(err)
            })  
    }
    return(
        <>
       

            <button type="button">
              Following {user.Following ? user.Following.length : 0}
            </button>
            <div>
        <ol>
            {user.Following ? user.Following.map((following) => (
              <>
                <li key={following._id}>
                    {following.UserName}
                </li>
                <button onClick={() => removeFollowing(following)}>Remove</button>

                </>
            )) : null}
        </ol>
        </div>

        <Button
              type="submit"
            //   fullWidth
              variant="contained"
              onClick={navToProfile}
            //   sx={{ mt: 3, mb: 2 }}
            sx={{ mt: 3, mb: 2 , bgcolor: "green", "&:hover": { bgcolor: 'black'}}}

            >
              Back To Profile
            </Button>
        </>
    )
    
}

