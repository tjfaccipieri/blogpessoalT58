import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import useLocalStorage from 'react-use-localstorage';

function Navbar() {

  let history = useNavigate()
  const [token, setToken] = useLocalStorage('token')

  function logout() {
    alert('Usuário deslogado com sucesso')
    setToken('')
    history('/login')
  }

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
                <Link to='/cadastroTema' style={{ color: 'white' }}>
                <Typography variant="h6" color="inherit">
                  cadastrar tema
                </Typography>
                </Link>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }} onClick={logout}>
                  <Typography variant="h6" color="inherit">
                    logout
                  </Typography>
              </Box>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
