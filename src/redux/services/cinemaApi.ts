import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface Cinema {
  id: string;
  name: string;
  movieIds: string[];
}

export const cinemaApi = createApi({
  reducerPath: 'cinema',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: (builder) => ({
    getCinemas: builder.query<Cinema[], undefined>({ query: () => 'cinemas' }),
  }),
});

export const { useGetCinemasQuery } = cinemaApi;
