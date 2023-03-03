import { createSlice } from '@reduxjs/toolkit';
import JwtService from 'src/services/jwtService';


const jwtService = new JwtService();

export const submitLogin = ({ email, password }) => async (dispatch) => {
  return jwtService
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      //TODO does something
      return;
    })
    .error((err) => {
      console.error(err);
      //TODO does something
      //TODO emits error message
      return;
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
    },
    loginError: (state, action) => {
      state.success = false;
    }
  },
  extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;