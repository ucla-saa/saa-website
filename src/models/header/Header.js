import React from 'react';
import {Button} from '@mui/material'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Toolbar';
import '../../styles/Header.css';
import {Link, useNavigate} from 'react-router-dom'
import { signOutUser } from '../../firebase.js';


const Header = () => {
    let navigate = useNavigate();
    const signOut = () => {
        try { 
            signOutUser()
            return navigate('/')
        }
        catch {
            return
        }
    }

    return (
        <React.Fragment>
            <Box >
                <AppBar elevation={0} position="sticky" sx={{bgcolor: '#fcfffc', color: '#121212'}}>
                    <Toolbar>
                        <Typography className="btn" variant='h3' component='h3'>
                            <Link to="/home">home</Link>
                        </Typography>
                        <Typography styleclassName="btn" variant='h3' component='h3'>
                            <Link to="/directory">directory</Link>
                        </Typography>
                        <Typography sx={{ml: 'auto'}} className="btn" variant='h3' component='h3'>
                            <Link to="/" onClick={signOut}>sign out</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    )
}

export default Header;