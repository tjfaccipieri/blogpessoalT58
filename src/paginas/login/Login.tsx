import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserLogin from '../../model/UserLogin';
import { login } from '../../service/Service';
import { addId, addToken } from '../../store/tokens/actions';
import './Login.css';

function Login() {
  // useState define como uma determinada variavel será inicializada quando o Componente for carregado em tela
  const [userLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: '',
  });
  const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: '',
  });

  // Redireciona o usuário para determinada pagina
  let history = useNavigate();

  // Hooks que vão manipular o nosso Local Storage para gravar o Token
  // const [token, setToken] = useLocalStorage('token');

  //novo metodo de login, utilizando o redux
  const dispatch = useDispatch()

  const [token, setToken] = useState('')

  // Função que junto com a setUserLogin irá atualizar o valor inicial da userLogin
  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  }

  // Função que irá enviar os dados de fato para o backend, interligando com o conteudo da Service.ts
  async function logar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await login('/usuarios/logar', userLogin, setRespUserLogin);
      toast.info('Usuário logado com sucesso', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",});
    } catch (error) {
      alert('Dados de usuário incorretos');
    }
  }

  // Hook de efeito colateral, sempre executa uma função quando o que estiver no seu Array é alterado
  useEffect(() => {
    if (token !== '') {
      dispatch(addToken(token))
      history('/home');
    }
  }, [token]);

  useEffect(() => {
    if (respUserLogin.token !== '') {
      dispatch(addToken(respUserLogin.token))
      dispatch(addId(respUserLogin.id.toString()))
      history('/home')
    }
  }, [respUserLogin.token])

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Box paddingX={20}>
            <form onSubmit={logar}>
              <Typography variant="h2" align="center">
                Entrar
              </Typography>
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
                value={userLogin.usuario}
                label="Usuário (e-mail)"
                name="usuario"
                id="usuario"
                fullWidth
                margin="normal"
              />
              <TextField
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
                value={userLogin.senha}
                label="Senha"
                name="senha"
                type="password"
                fullWidth
                margin="normal"
              />
              <Box display="flex" justifyContent="center" marginY={2}>
                <Button variant="contained" type="submit">
                  Entrar
                </Button>
              </Box>
            </form>
            <Typography variant="body1" gutterBottom align="center" marginTop={2}>
              Ainda não tem uma conta?
              <Link to="/cadastro" className="linkCadastro">
                Cadastre-se
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} className="fundoLogin"></Grid>
      </Grid>
    </>
  );
}

export default Login;
