import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Postagem from '../../../model/Postagem';
import Tema from '../../../model/Tema'
import User from '../../../model/User';
import { busca, buscaId, post, put } from '../../../service/Service'
import { TokenState } from '../../../store/tokens/tokensReducer';

function CadastroPostagem() {

  let history = useNavigate()

  const {id} = useParams<{id: string}>()

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
  )

  useEffect(() => {
    if(token === '') {
      alert('Você precisa estar logado pra fazer isso')
      history('/login')
    }
  }, [token])

  const [temas, setTemas] = useState<Tema[]>([])

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: ''
  })

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    data: '',
    texto: '',
    titulo: '',
    tema: null,
    usuario: null
  })

  const [usuario, setUsuario] = useState<User>({
    id: +userId,
    nome:'',
    usuario: '',
    senha: '',
    foto: ''
  })

  function updatedModel(event: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [event.target.name]: event.target.value,
      tema: tema,
    })
  }

  async function buscaTema() {
    await busca('/temas', setTemas, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    setPostagem({
        ...postagem,
        tema: tema,
        usuario: usuario
    })
    console.log(postagem)
}, [tema])

  async function findByIdPostagem(id: string) {
    await buscaId(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    buscaTema()
    if(id !== undefined) {
      findByIdPostagem(id)
    }
  }, [id])

  async function cadastrar(event: ChangeEvent<HTMLFormElement>){
    event.preventDefault()
    if(id !== undefined) {
      try {
        await put('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token
          }
        })
        alert('Postagem atualizada com sucesso')
      } catch (error) {
        alert('Falha ao atualizar a postagem')
      }
    } else {
      try {
        await post('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token
          }
        })
        alert('postagem feita com sucesso')
      } catch (error) {
        alert('Falha ao cadastrar a postagem')
      }
    }
    back()
  }

  function back() {
    history('/posts')
  }

  return (
    <>
      <Container maxWidth='sm' className='topo'>
        <form onSubmit={cadastrar}>
          <Typography variant='h3' align='center'>Formulário de {id === undefined ? <span>cadastro</span> : <span>atualização</span>} de postagem</Typography>

          <TextField
            id='titulo'
            value={postagem.titulo}
            onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event) }
            name='titulo'
            label='Titulo da postagem'
            variant='outlined'
            margin='normal'
            fullWidth />

          <TextField 
            id='texto' 
            value={postagem.texto}
            onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event) }
            name='texto' 
            label='Texto da postagem' 
            variant='outlined' 
            margin='normal' 
            fullWidth
            multiline
            required
            minRows={4}
            />

          <FormControl fullWidth>
            <InputLabel id='temaSelect'>Tema</InputLabel>
            <Select labelId='temaSelect' id='tema' 
            onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
              headers: {
                Authorization: token
              }
            })}>
              
              {temas.map((tema) => (
                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
              ))}

              
            </Select>
            <FormHelperText>Escolha um tema para a postagem</FormHelperText>

            <Button type='submit' variant='contained' color='primary' disabled={tema.id === 0}>{id === undefined ? <span>Nova postagem</span> : <span>Atualizar postagem</span>}</Button>
          </FormControl>
        </form>
      </Container>
    </>
  )
}

export default CadastroPostagem