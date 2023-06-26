import type { RootState } from '../../store';

const selectFiltersModule = (state: RootState) => state.filters;

export const selectTitle = (state: RootState) => selectFiltersModule(state).title;

export const selectGenre = (state: RootState) => selectFiltersModule(state).genre;

export const selectCinema = (state: RootState) => selectFiltersModule(state).cinema;
