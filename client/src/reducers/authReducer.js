import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    accessToken: '',
    user: {},
    admin: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.admin = action.payload.admin;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { setAuth, setIsLogin, setAccessToken, setUser, setAdmin } =
  authSlice.actions;
export default authSlice.reducer;
