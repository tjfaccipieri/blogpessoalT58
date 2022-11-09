import './ListaTemas.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import Tema from '../../../model/Tema';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../service/Service';


function ListaTemas() {
  // constante para armazenar os temas do backend
  const [temas, setTemas] = useState<Tema[]>([]);

  // constante que vai acessar o meu token
  const [token, setToken] = useLocalStorage('token');

  // funcção que vai solicitar os temas do backend
  async function buscaTema() {
    await busca('/temas', setTemas, {
      headers: {
        Authorization: token
      }
    })
    
  }

  // vai rodar assim que a tela for aberta pelo usuario
  useEffect(() => {
    buscaTema()
  }, [])

  return (
    <>
    {/* o Map irá percorrer o array de temas, e gerar um card novo para cada tema existente */}
      {temas.map((tema) => (
        <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema
            </Typography>

            <Typography variant="h5" component="h2">
              {tema.descricao} - id: {tema.id}
            </Typography>
          </CardContent>

          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>
              <Link to="" className="text-decorator-none">
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

              <Link to="" className="text-decorator-none">
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
