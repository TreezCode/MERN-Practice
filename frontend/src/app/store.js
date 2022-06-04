// external imports
import { configureStore } from '@reduxjs/toolkit';
// internal imports
import { apiSlice } from './api/apiSlice';
import goalReducer from '../features/goals/goalSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    goal: goalReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV === 'production' ? false : true
});
