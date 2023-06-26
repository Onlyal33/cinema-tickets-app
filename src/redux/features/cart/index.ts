import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  [index: string]: number;
}

const initialState: CartState = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const count = state[action.payload] || 0;
      state[action.payload] = count + 1;
    },
    decrement: (state, action: PayloadAction<string>) => {
      const count = state[action.payload];

      if (!count) {
        return;
      }

      if (count === 1) {
        delete state[action.payload];
        return;
      }

      state[action.payload] = count - 1;
    },
    reset: (state, action: PayloadAction<string>) => {
      state[action.payload] = 0;
    },
    resetAll: () => initialState,
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
