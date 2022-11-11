import { Box, Button, Grid, TextField } from '@mui/material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import './Cadastro.css';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import User from '../../model/User';
import { cadastro } from '../../service/Service';

function Cadastro() {
  let history = useNavigate();

  // state reservado para pegar apenas o campo de confirmação de senha, que não irá para o backend
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  // função para atualizar o campo de confirmação de senha
  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  // oneWay data-binding

  // state que vai levar os dados para o backend
  const [user, setUser] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  // state que recebera os dados de retorno do backend (devido a senha que volta criptografada)
  const [userResult, setUserResult] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  // mesma coisa do componente de Login, função que irá atualizar o state junto com o formulário
  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    // verificação dos campos de senha

    // = => atribuição de valor
    // == => checa o conteudo
    // ===  => checa conteudo e tipagem

    // 123 == '123'
    if (confirmarSenha === user.senha && user.senha.length >= 3) {
      // caso senhas ok, tenta cadastrar no backend
      try {
        await cadastro('/usuarios/cadastrar', user, setUserResult);
        alert('Usuário cadastrado com sucesso'); //msg em caso de sucesso
      } catch (error) {
        alert('Falha interna ao cadastrar'); //caso de erro no backend, cai aqui
      }
    } else {
      // msg de erro para o caso de não passar no if das senhas
      alert('As senhas não conferem. Favor verificar novamente');

      setUser({ ...user, senha: '' }); //zerar o campo de senha
      setConfirmarSenha(''); // zerar o campo de confirmar senha
    }
  }

  // assim que receber o ID de retorno do cadastro do backend, redireciona pro Login.
  useEffect(() => {
    if (userResult.id !== 0) {
      history('/login');
    }
  }, [userResult]);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={6} className="fundoCadastro"></Grid>
        <Grid item xs={6} display="flex" justifyContent="center">
          <Grid item xs={8} justifyContent="center">
            <Typography variant="h3" align="center">
              Cadastre-se
            </Typography>
            <form onSubmit={cadastrar}>
              <TextField
                value={user.nome}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
                name="nome"
                label="Nome completo"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                value={user.usuario}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
                name="usuario"
                label="Usuario (e-mail)"
                fullWidth
                margin="normal"
                // torna o campo obrigatorio para preenchimento
                required
                // coloca uma mensagem de ajuda ao usuário
                placeholder='digite um e-mail valido'
              />
              <TextField
                value={user.foto}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
                name="foto"
                label="URL da foto"
                fullWidth
                margin="normal"
              />
              <TextField
                value={user.senha}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
                name="senha"
                label="Senha"
                fullWidth
                margin="normal"
                placeholder='Digite pelo menos 8 caracteres'
              />
              <TextField
                value={confirmarSenha}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  confirmarSenhaHandle(event)
                }
                name="confirmSenha"
                label="Confirmar senha"
                fullWidth
                margin="normal"
              />
              <Box display="flex" justifyContent="center" gap={4} marginTop={2}>
                <Link to="/login">
                  <Button variant="contained" color="error">
                    Cancelar
                  </Button>
                </Link>
                <Button variant="contained" type='submit'>Cadastrar</Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Cadastro;
