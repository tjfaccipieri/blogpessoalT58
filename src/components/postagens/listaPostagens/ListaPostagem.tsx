import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import './ListaPostagem.css';
import { Box } from '@mui/material';

function ListaPostagem() {
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Postagens
            </Typography>

            <Typography variant="h5" component="h2">
              Título
            </Typography>

            <Typography variant="body2" component="p">
              Texto da Postagem
            </Typography>

            <Typography variant="body2" component="p">
              Tema
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
    </>
  );
}

export default ListaPostagem;
