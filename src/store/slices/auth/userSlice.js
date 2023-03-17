import { createSlice } from '@reduxjs/toolkit';


import JwtService from 'src/services/jwtService';
import history from 'src/utils/@history';


const jwtService = new JwtService();


export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().auth;

  history.push({
    pathname: '/',
  });

  jwtService.logout();

  return dispatch(userLoggedOut());
}

const initialState = {
  //TODO user data
  data: {},
};

const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { userLoggedOut } = userSlice.actions;

export default userSlice.reducer;