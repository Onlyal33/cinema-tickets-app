import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './features/cart';
import { cinemaApi } from './services/cinemaApi';
import { movieApi } from './services/movieApi';
import { reviewApi } from './services/reviewApi';
import { filtersReducer } from './features/filters';

export const store = configureStore({
  reducer: {
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    cart: cartReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      cinemaApi.middleware,
      movieApi.middleware,
      reviewApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
