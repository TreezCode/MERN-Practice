// external imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// internal imports
import { setCredentials, signOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: (process.env.NODE_ENV === 'production'
    ? 'https://mernapptreez.herokuapp.com/'
    : 'http://localhost:5000'),
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    console.log('Sending refresh token...');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/api/refresh', api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store new access token
      api.dispatch(setCredentials({ user, ...refreshResult.data }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(signOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
