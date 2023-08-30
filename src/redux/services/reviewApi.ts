import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewApi = createApi({
  reducerPath: 'review',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getReviews: builder.query({ query: () => 'reviews' }),
    getReviewsByMovie: builder.query({
      query: (movieId) => `reviews?movieId=${movieId}`,
    }),
  }),
});

export const { useGetReviewsQuery, useGetReviewsByMovieQuery } = reviewApi;
