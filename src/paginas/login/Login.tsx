import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';


function Login() {

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Box padding={20}>
            <form>
              <Typography variant='h2' align='center'>Entrar</Typography>
              <TextField
                label="Usuário (e-mail)"
                name="usuario"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Senha"
                name="senha"
                type="password"
                fullWidth
                margin="normal"
              />
              <Box display='flex' justifyContent='center' marginY={2}>
                <Link to="/home">
                  <Button variant="contained">Entrar</Button>
                </Link>
              </Box>
            </form>
            <hr />
            <Typography variant="body1" align="center" marginTop={2}>
              Ainda não tem uma conta? 
              <Link to='/cadastro' className='linkCadastro'>Cadastre-se</Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} className="fundoLogin"></Grid>
      </Grid>
    </>
  );
}

export default Login;
