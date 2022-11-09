import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container justifyContent="space-between" >
            <Box style={{ cursor: 'pointer' }}>
              <Typography variant="h5" color="inherit">
                BlogPessoal
              </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Link to="/home" style={{ color: 'white' }}>
                  <Typography variant="h6" color="inherit">
                    home
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Link to="/posts" style={{ color: 'white' }}>
                  <Typography variant="h6" color="inherit">
                    postagens
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Link to="/temas" style={{ color: 'white' }}>
                  <Typography variant="h6" color="inherit">
                    temas
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Typography variant="h6" color="inherit">
                  cadastrar tema
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Link to="/login" style={{ color: 'white' }}>
                  <Typography variant="h6" color="inherit">
                    logout
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
