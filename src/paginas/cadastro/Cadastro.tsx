import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react'
import './Cadastro.css'
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Cadastro() {
  return (
    <>
      <Grid container alignItems='center'>
        <Grid item xs={6} className='fundoCadastro'></Grid>
        <Grid item xs={6} display='flex' justifyContent='center'>
          <Grid item xs={8} justifyContent='center'>
            <Typography variant='h3' align='center'>Cadastre-se</Typography>
            <form>
              <TextField name='nome' label='Nome completo' fullWidth margin='normal' />
              <TextField name='usuario' label='Usuario (e-mail)' fullWidth margin='normal' />
              <TextField name='foto' label='URL da foto' fullWidth margin='normal' />
              <TextField name='senha' label='Senha' fullWidth margin='normal' />
              <TextField name='confirmSenha' label='Confirmar senha' fullWidth margin='normal' />
              <Box display='flex' justifyContent='space-around' marginTop={2}>
                <Link to='/login'>
                  <Button variant='contained' color='error'>Cancelar</Button>
                </Link>
                <Button variant='contained'>Cadastrar</Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Cadastro