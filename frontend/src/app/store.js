import { configureStore } from '@reduxjs/toolkit';
import goalReducer from '../features/goals/goalSlice';
import authReducer from '../features/auth/authSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    goal: goalReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});
