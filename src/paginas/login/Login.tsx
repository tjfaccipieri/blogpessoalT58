import { Grid, Box, Typography, TextField, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'


function Login() {
  return (
    <>
      <Grid container alignItems='center'>
        <Grid item xs={6} >
          <Box padding={20}>
            <form>
              <Typography>Entrar</Typography>
              <TextField label='Usuário (e-mail)' name='usuario' fullWidth margin='normal' />
              <TextField label='Senha' name='senha' type='password' fullWidth margin='normal' />
              <Link to='/home'>
                <Button variant='contained'>Entrar</Button>
              </Link>
            </form>

            <Typography>Ainda não tem uma conta? Cadastre-se</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} className='fundoLogin'></Grid>
      </Grid>
    </>
    )
}

export default Login