import { Container, TextField, Typography, Button } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../model/Tema';
import { buscaId, put, post } from '../../../service/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import './CadastroTema.css'
import { toast } from 'react-toastify';

function CadastroTema() {
  let history = useNavigate();

  const { id } = useParams<{ id: string }>();

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado pra ficar aqui');
      history('/login');
    }
  }, [token]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',

  });

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    await buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  function updatedModel(event: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [event.target.name]: event.target.value,
    });
  }

  async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()

    if(tema.descricao.length >= 5) {

      if(id !== undefined) {
        try {
          await put('/temas', tema, setTema, {
            headers: {
              Authorization: token,
            },
          })
  
          toast.success('Tema atualizado com sucesso', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        } catch (error) {
          toast.error('Falha ao atualizar o tema', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        }
      } else {
        try {
          await post('/temas', tema, setTema, {
            headers: {
              Authorization: token,
            },
          })
  
          toast.success('Tema cadastrado com sucesso', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        } catch (error) {
          toast.error('Falha ao cadastrar o tema', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        }
      }
    } else {
      toast.error('Descrição muito pequena.. Ta economizando?', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }

    back()
  }

  function back(){ 
    history('/temas')
  }

  return (
    <Container maxWidth="sm" className="topo">
      <form onSubmit={cadastrar}>
        <Typography
          variant="h3"
          color="textSecondary"
          component="h1"
          align="center"
        >
          Formulário de {id === undefined ? <span>cadastro</span> : <span>atualização</span>} de tema
        </Typography>

        <TextField
          value={tema.descricao}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updatedModel(event)
          }
          id="descricao"
          variant="outlined"
          name="descricao"
          margin="normal"
          fullWidth
          label="Descrição"
        />

        <Button type="submit" variant="contained" color="primary" disabled={tema.descricao.length < 5}>
          {id === undefined ? <span>Cadastrar tema</span> : <span>Atualizar tema</span>}
        </Button>
      </form>
    </Container>
  );
}

export default CadastroTema;
