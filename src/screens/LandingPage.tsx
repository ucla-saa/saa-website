import React from 'react';
import logo from '../logo.svg';
import '../styles/LandingPage.css';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'

function LandingPage() {
  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
      <div className="Landing">
        <h2> UCLA Student Alumni Association </h2>
        <Stack className="Login">
            <TextField fullWidth id="standard-basic" label="Email" variant="standard" />
            <TextField fullWidth id="standard-basic" label="Password" variant="standard" />
        </Stack>
        <Button style={{margin: '2rem'}}variant="contained">Login</Button>
      </div>
    </div>
  );
}

export default LandingPage;
