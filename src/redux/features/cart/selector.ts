import type { RootState } from '../../store';

const selectCartModule = (state: RootState) => state.cart;

export const selectProductAmount = (state: RootState, id: string) =>
  selectCartModule(state)[id] || 0;

export const selectTotalAmount = (state: RootState) =>
  Object.values(selectCartModule(state)).reduce((acc, el) => acc + el, 0);

export const selectPositiveAmountsAndIds = (state: RootState) =>
  Object.entries(selectCartModule(state)).filter(([, value]) => value > 0);

export const selectIsDecrementEnabled = (state: RootState, id: string) =>
  selectProductAmount(state, id) > 0;

export const selectIsIncrementEnabled = (state: RootState, id: string) =>
  selectProductAmount(state, id) < 30;

export const selectIsAmountEqual1 = (state: RootState, id: string) =>
  selectProductAmount(state, id) === 1;