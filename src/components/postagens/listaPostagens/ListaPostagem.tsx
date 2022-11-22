import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

import './ListaPostagem.css';
import { Box } from '@mui/material';
import {useState, useEffect, ChangeEvent} from 'react';
import Postagem from '../../../model/Postagem';
import { busca } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import ModalDelete from '../modalDelete/ModalDelete';

function ListaPostagem() {

  let history = useNavigate()

  const [postagens, setPostagens] = useState<Postagem[]>([])

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
  )

  useEffect(() => {
    if(token === '') {
      history('/login')
      alert('Você precisa estar logado pra ver essa tela')
    }
  }, [token])


  const [postBuscado, setPostBuscado] = useState('')

  function updateBusca(event: ChangeEvent<HTMLInputElement>){
    setPostBuscado(
      event.target.value
    )
  }

  async function getPosts() {
    if(postBuscado !== '' ) {
      await busca(`/postagens/titulo/${postBuscado}`, setPostagens, {
        headers: {
          Authorization: token
        }
      })
    } else {
      await busca('/postagens', setPostagens, {
        headers: {
          Authorization: token
        }
      })
    }
  }

  useEffect(() => {
    getPosts()
  }, [postagens.length])

  return (

    <>
    
    <div className="group">
      <input placeholder="Search" type="search" className="input" name='busca' onChange={(event: ChangeEvent<HTMLInputElement>) => updateBusca(event)} />
      <svg className="icon" onClick={getPosts} aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
    </div>
    
    <Box className='containerLista'>
      {postagens.length === 0 && <span className="loader">L &nbsp; ading</span>}


      
      {postagens.map((postagem) => (
        <Box alignSelf='flex-start'>
        <Card variant="outlined" className='postagens'>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {postagem.tema?.descricao}
            </Typography>

            <Typography variant="h5" component="h2">
              {postagem.titulo}
            </Typography>

            <Typography variant="body2" component="p">
              {postagem.texto}
            </Typography>
            
            <Typography variant="body2" component="p">
              Postado em: {new Date(Date.parse(postagem.data)).toLocaleDateString()} <br />
              {/* Mostar data e hora: {new Date(Date.parse(postagem.data)).toLocaleString()} <br />
              Mostrar apenas hora: {new Date(Date.parse(postagem.data)).toLocaleTimeString()} */}
            </Typography>

            <Typography variant="body2" component="p">
              Postagem feita por: {postagem.usuario?.nome}
            </Typography>
          </CardContent>

          {postagem.usuario?.id === +userId && <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>
              <Link to={`/editarPostagem/${postagem.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button
                    variant="contained"
                    className="marginLeft"
                    size="small"
                    color="primary"
                  >
                    Atualizar
                  </Button>
                </Box>
              </Link>

              {/* <Link to={`/deletarPostagem/${postagem.id}`} className="text-decorator-none"> */}
                <Box mx={1}>
                  <ModalDelete postId={postagem.id} />
                </Box>
              {/* </Link> */}
              {/* <Link to={`/deletarPostagem/${postagem.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size="small" color="secondary">
                    Deletar
                  </Button>
                </Box>
              </Link> */}
            </Box>
          </CardActions>}
        </Card>
      </Box>
      ))}
    </Box>
    </>
  );
}

export default ListaPostagem;
