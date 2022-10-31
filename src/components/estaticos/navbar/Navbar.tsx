import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import React from 'react';
import './Navbar.css'

function Navbar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar className='barra'>
          <div className='textos'>
          <Typography variant="h6" color='primary' className='title'>
            News
          </Typography>
          <Typography variant="h6">
            News
          </Typography>
          <Typography variant="h6">
            News
          </Typography>
          <Typography variant="h6">
            News
          </Typography>
          </div>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
