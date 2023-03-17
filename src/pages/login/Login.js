import React, { useState, useEffect } from 'react';
import {  Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// MUI imports
import { 
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box, 
  Typography,
  Container,
  IconButton,
  Icon,
  InputAdornment
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Reducers
import { submitLogin } from 'src/store/slices/auth/loginSlice';

const theme = createTheme();

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("Digite o e-mail"),
  password: yup
    .string()
    .required("Digite a senha")
});

const initialValues = {
  email: '',
  password: ''
}

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(({ auth }) => auth.login);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate({ pathname: '/dashboards' });
  }, [isLoggedIn]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar em TaskTime
          </Typography>
          
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(submitLogin(values));
              }}
            >
              {({ errors, handleChange, handleBlur, handleSubmit, isValid, isDirty, values }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    id="email"
                    label="Endereço de E-Mail"
                    name="email"
                    autoFocus
                    autoComplete="email"
                    type="email"
                    error={!!errors?.email}
                    helperText={errors?.email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    id="password"
                    label="Senha"
                    name="password"
                    autoComplete="current-password"
                    
                    error={!!errors?.password}
                    helperText={errors?.password}
                    InputProps={{
                      type: showPassword ? "text" : "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                            <Icon color="action">
                              { showPassword ? 'visibility_off' : 'visibility' }
                            </Icon>
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    disabled={!isValid || isDirty}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Entrar
                  </Button>
                </Box>
              )}
            </Formik>
        </Box>
      </Container>
    </>
  )
}

export default Login