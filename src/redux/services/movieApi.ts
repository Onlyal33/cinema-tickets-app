import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface MovieInfo {
  title: string;
  posterUrl: string;
  releaseYear: number;
  description: string;
  genre: string;
  id: string;
  rating: number;
  director: string;
  reviewIds: string[];
}

export const movieApi = createApi({
  reducerPath: 'movie',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getMovies: builder.query<MovieInfo[], undefined>({ query: () => 'movies' }),
    getMoviesByCinema: builder.query<MovieInfo[], string>({
      query: (cinemaId) => `movies?cinemaId=${cinemaId}`,
    }),
    getMovie: builder.query<MovieInfo, string>({ query: (movieId) => `movie?movieId=${movieId}` }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMoviesByCinemaQuery,
  useGetMovieQuery,
} = movieApi;
