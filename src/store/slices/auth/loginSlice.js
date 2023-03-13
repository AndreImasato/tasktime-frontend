import { createSlice } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import JwtService from 'src/services/jwtService';

import history from 'src/utils/@history';


const jwtService = new JwtService();

export const submitLogin = ({ email, password }) => async (dispatch) => {
  return jwtService
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      dispatch(loginSuccess());
      history.push({
        pathname: '/dashboards'
      });
      return ;
    })
    .catch((err) => {
      console.error(err);
      enqueueSnackbar(
        "Erro ao tentar efetuar o login",
        {
          variant: 'error',
          autoHideDuration: 2000,
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          }
        }
      );
      return dispatch(loginError());
    })
}

const initialState = {
  success: false,
  isLoggedIn: false,
}

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.isLoggedIn = true;
    },
    loginError: (state, action) => {
      state.success = false;
      state.isLoggedIn = false;
    }
  },
  extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;