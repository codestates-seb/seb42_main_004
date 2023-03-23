import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    accessToken: '',
    tokenExpirationDate: '',
    user: {},
    admin: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.accessToken = action.payload.accessToken;
      state.tokenExpirationDate = action.payload.tokenExpirationDate;
      state.user = action.payload.user;
      state.admin = action.payload.admin;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setTokenExpirationDate: (state, action) => {
      state.tokenExpirationDate = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const {
  setAuth,
  setIsLogin,
  setAccessToken,
  setTokenExpirationDate,
  setUser,
  setRoles,
} = authSlice.actions;
export default authSlice.reducer;
