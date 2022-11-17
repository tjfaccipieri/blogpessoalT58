import './ListaTemas.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, ChangeEvent } from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  InputBase 
} from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import Tema from '../../../model/Tema';
import { busca } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';


function ListaTemas() {
  // constante que vai acessar o meu token
  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  let history = useNavigate()
  useEffect(() => {
    if(token === '') {
      alert('Você preisa estar logado pra ficar aqui')
      history('/login')
    }
  }, [token])
  

  // constante para armazenar os temas do backend
  const [temas, setTemas] = useState<Tema[]>([]);

  const [temaBuscado, setTemaBuscado] = useState('')

  function updateBusca(event: ChangeEvent<HTMLInputElement>){
    setTemaBuscado(
      event.target.value
    )
  }


  // funcção que vai solicitar os temas do backend
  async function buscaTema() {
    if(temaBuscado !== ''){
      await busca(`/temas/descricao/${temaBuscado}`, setTemas, {
        headers: {
          Authorization: token
        }
      })
    } else {
      await busca('/temas', setTemas, {
        headers: {
          Authorization: token
        }
      })
    }
  }

  // vai rodar assim que a tela for aberta pelo usuario
  useEffect(() => {
    buscaTema()
  }, [temas.length])

  return (
    <>
          <div className="group">
      <input placeholder="Search" type="search" className="input" name='busca' onChange={(event: ChangeEvent<HTMLInputElement>) => updateBusca(event)} />
      <svg className="icon" onClick={buscaTema} aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
    </div>
    
    {/* o Map irá percorrer o array de temas, e gerar um card novo para cada tema existente */}
      {temas.map((tema, index) => (
        
        <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema {index + 1}
            </Typography>

            <Typography variant="h5" component="h2">
              {tema.descricao}
            </Typography>
          </CardContent>

          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>
              <Link to={`/editarTema/${tema.id}`} className="text-decorator-none">
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

              <Link to={`/apagarTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size="small" color="secondary">
                    Deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))}
    </>
  );
}

export default ListaTemas;
