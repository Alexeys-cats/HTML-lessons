import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5030' }),
  endpoints: (builder) => ({
    loginByUsername: builder.query({
      query: ({ username, password }) =>
        `/users?username=${username}&password=${password}`,
    }),
  }),
});

export const { useLazyLoginByUsernameQuery } = authApi;
