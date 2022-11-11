import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import './DeletarTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../model/Tema';
import { buscaId, deleteId } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function DeletarTema() {
  let history = useNavigate();

  const { id } = useParams<{ id: string }>();

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  useEffect(() => {
    if(token === '') {
      alert('Você precisa estar logado pra chegar aqui')
      history('/login')
    }
  }, [token])

  const [tema, setTema] = useState<Tema>();

  useEffect(() => {
    if(id !== undefined) {
      findById(id)
    }
  }, [id])

  async function findById(id: string) {
    await buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token
      }
    })
  }

  async function sim() {
    await deleteId(`/temas/${tema?.id}`, {
      headers: {
        Authorization: token
      }
    })
    alert('Tema apagado com sucesso')
    history('/temas')
  }

  function nao(){
    history('/temas')
  }


  return (
    <div className='container'>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography>Deseja deletar o tema:</Typography>
              <Typography color="textSecondary">Tema {tema?.id} - {tema?.descricao}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" gap={2}>
              <Button variant="contained" size="large" color="secondary" onClick={nao}>
                Não
              </Button>
              <Button variant="contained" size="large" color="primary" onClick={sim} >
                Sim
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}

export default DeletarTema;
