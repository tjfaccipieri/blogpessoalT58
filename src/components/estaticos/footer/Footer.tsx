import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { FacebookRounded } from '@mui/icons-material';
import { Instagram, LinkedIn } from '@material-ui/icons';
import GitHub from '@mui/icons-material/GitHub'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function Footer() {
  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  );

  return (
    <>
      {token !== '' && <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid alignItems="center" item xs={12}>
          <Box style={{ backgroundColor: '#3F51B5', height: '120px' }}>
            <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h5" align="center" gutterBottom style={{ color: 'white' }}>
                Siga-nos nas redes sociais{' '}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <a href="https://www.facebook.com" target="_blank">
                <FacebookRounded style={{ fontSize: 60, color: 'white' }} />
              </a>
              <a href="https://www.instagram.com" target="_blank">
                <Instagram style={{ fontSize: 60, color: 'white' }} />
              </a>
              <a href="https://www.github.com/tjfaccipieri" target="_blank">
                <GitHub style={{ fontSize: 60, color: 'white' }} />
              </a>
              <a
                href="https://www.linkedin.com/in/thiago-faccipieri/"
                target="_blank"
              >
                <LinkedIn style={{ fontSize: 60, color: 'white' }} />
              </a>
            </Box>
          </Box>
          <Box style={{ backgroundColor: '#303F9F', height: '60px' }}>
            <Box paddingTop={1}>
              <Typography variant="subtitle2" align="center" gutterBottom style={{ color: 'white' }}>
                © 2020 Copyright:
              </Typography>
            </Box>
            <Box>
              <a target="_blank" href="https://brasil.generation.org">
                <Typography variant="subtitle2" gutterBottom style={{ color: 'white' }} align="center">
                  brasil.generation.org
                </Typography>
              </a>
            </Box>
          </Box>
        </Grid>
      </Grid>}
    </>
  );
}

export default Footer;
