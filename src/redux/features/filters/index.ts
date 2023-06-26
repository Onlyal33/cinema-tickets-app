import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  title: string;
  genre: string | undefined;
  cinema: string | undefined;
}

const initialState: FiltersState = { title: '', genre: undefined, cinema: undefined };

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setGenre: (state, action: PayloadAction<string | undefined>) => {
      state.genre = action.payload;
    },
    setCinema: (state, action: PayloadAction<string | undefined>) => {
      state.cinema = action.payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const filtersActions = filtersSlice.actions;
