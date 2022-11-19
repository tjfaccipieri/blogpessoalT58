import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../../../store/tokens/actions';
import { TokenState } from '../../../store/tokens/tokensReducer';

function Navbar() {
  let history = useNavigate();

  const dispatch = useDispatch();

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  );

  function logout() {
    alert('Usuário deslogado com sucesso');
    dispatch(addToken(''));
    history('/login');
  }

  let navBarComponent;

  if (token !== '') {
    navBarComponent = (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container justifyContent="space-between">
            <Box style={{ cursor: 'pointer' }}>
            <Link to="/home" style={{ color: 'white' }}>
                  <Typography variant="h6" color="inherit">
                    BlogPessoal
                    
                  </Typography>
                </Link>
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
                <Link to="/cadastroTema" style={{ color: 'white' }}>
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
    );
  }

  return( 
    <>
      {navBarComponent}
    </>
  );
}

export default Navbar;
