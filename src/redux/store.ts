import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./services/movieApi";
import { cartReducer } from "./features/cart";

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([movieApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
