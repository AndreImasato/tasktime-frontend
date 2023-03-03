import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// MUI imports
import {
  Box,
  CssBaseline,
  Container,
  Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Astronaut
//<a href="https://www.freepik.com/free-vector/page-found-concept-illustration_7887410.htm#query=not%20found&position=13&from_view=search&track=ais">Image by storyset</a> on Freepik

const theme = createTheme();

const Page404 = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" disableGutters>
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 0.5,
              flexDirection: 'column',
              height: "100%",
            }}
          >
            <Typography variant="h5" color="textSecondary">
              Oops! Não foi possível encontrar a página procurada
            </Typography>
            <Link 
              to="/dashboards" 
              style={{
                textDecoration: "none",
                marginTop: 10
              }}
            >
              <Typography variant="h6" color="textSecondary">
                Clique para voltar para a tela inicial
              </Typography>
            </Link>
            <Typography 
              variant="subtitle1"
              color="textSecondary"
              style={{
                justifySelf: "flex-end",
                marginTop: 10
              }}
            >
              <a 
                href="https://www.freepik.com/free-vector/page-found-concept-illustration_7887410.htm#query=not%20found&position=13&from_view=search&track=ais"
                style={{
                  textDecoration: "none",
                  color: "inherit"
                }}
              >Imagem por storyset</a> em Freepik
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 0.5,
              height: "100%",
            }}
          >
            <img 
              src="/illustrations/404_astronaut.jpg"
              alt="404_image"
              style={{
                width: 500,
                height: 500,
              }}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Page404;