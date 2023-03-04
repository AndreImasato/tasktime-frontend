import { createSlice } from '@reduxjs/toolkit';
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
      //TODO emits error message
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