import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Toolbar';
import '../../styles/Header.css';


const Header = () => {
    return (
        <React.Fragment>
            <Box >
                <AppBar elevation={0} position="sticky" sx={{bgcolor: '#fcfffc', color: '#121212'}}>
                    <Toolbar>
                        <Typography className="btn" variant='h3' component='h3'>
                            <a href="/">home</a>
                        </Typography>
                        <Typography className="btn" variant='h3' component='h3'>
                            <a href="/#projects">directory</a>
                        </Typography>
                        <Typography className="btn" variant='h3' component='h3'>
                            <a href="/#about">about</a>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    )
}

export default Header;