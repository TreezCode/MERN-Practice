// external imports
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { email, accessToken } = action.payload;
      state.user = email;
      state.token = accessToken;
    },
    signOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, signOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
