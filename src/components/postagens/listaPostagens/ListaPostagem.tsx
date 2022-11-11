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
import {useState, useEffect} from 'react';
import Postagem from '../../../model/Postagem';
import { busca } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

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

  async function getPosts() {
    await busca('/postagens', setPostagens, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    getPosts()
  }, [postagens.length])

  return (
    <>
      {postagens.length === 0 && <span className="loader">L &nbsp; ading</span>}

      {postagens.map((postagem) => (
        <Box m={2}>
        <Card variant="outlined" className='postagens'>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Postagens
            </Typography>

            <Typography variant="h5" component="h2">
              {postagem.titulo}
            </Typography>

            <Typography variant="body2" component="p">
              {postagem.texto}
            </Typography>
            
            <Typography variant="body2" component="p">
              Mostrar apenas data: {new Date(Date.parse(postagem.data)).toLocaleDateString()} <br />
              {/* Mostar data e hora: {new Date(Date.parse(postagem.data)).toLocaleString()} <br />
              Mostrar apenas hora: {new Date(Date.parse(postagem.data)).toLocaleTimeString()} */}
            </Typography>

            <Typography variant="body2" component="p">
              {postagem.tema?.descricao}
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

              <Link to={`/deletarPostagem/${postagem.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size="small" color="secondary">
                    Deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>}
        </Card>
      </Box>
      ))}
    </>
  );
}

export default ListaPostagem;
