'use client';

import { useState } from 'react';
import { useGetCinemasQuery } from '@/redux/services/cinemaApi';
import { useGetMoviesQuery } from '@/redux/services/movieApi';
import getGenreName from '@/i18n/getGenreName';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { filtersActions } from '@/redux/features/filters';
import {
  selectCinema,
  selectGenre,
  selectTitle,
} from '@/redux/features/filters/selector';
import useDebounce from '@/app/hooks/useDebounce';
import Input from '../Input/Input';
import Select from '../Select/Select';
import styles from './Filters.module.css';

interface ApiItem {
  id: string;
  name: string | undefined;
  movieIds: string[];
}

const Filters = function Filters() {
  return (
    <div className={styles.container}>
      <Filters.Title />
      <Filters.Genre />
      <Filters.Cinema />
    </div>
  );
};

Filters.Title = function TitleInput() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectTitle);
  const [value, setValue] = useState('');

  const onChange = () => dispatch(filtersActions.setTitle(value));

  const debouncedOnChange = useDebounce(onChange);

  return (
    <Input
      onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
        debouncedOnChange();
        setValue(target.value);
      }}
      label="Название"
      placeholder="Введите название"
      value={value}
    ></Input>
  );
};

Filters.Genre = function GenreSelect() {
  const { data: movies, isLoading, error } = useGetMoviesQuery(undefined);

  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectGenre);

  if (error) {
    return <span>Not Found</span>;
  }

  let data: ApiItem[] = [];

  if (movies !== undefined) {
    const moviesByGenre: { [genre: string]: string[] } = movies?.reduce(
      (acc, { genre, id }) => {
        if (!acc.hasOwnProperty(genre)) {
          return { ...acc, [genre]: [id] };
        }
        const temp = acc[genre as keyof typeof acc];
        return { ...acc, [genre]: [...temp, id] };
      },
      {}
    );

    data = Object.entries(moviesByGenre).map(
      ([id, movieIds]) => ({
        id,
        movieIds,
        name: getGenreName(id),
      })
    );
  }
  return (
    <Select
      options={movies === undefined ? [] : data}
      selected={data.find((e) => e.id === selected)}
      onChange={(id) => dispatch(filtersActions.setGenre(id))}
      placeholder="Выберите жанр"
      label="Жанр"
    ></Select>
  );
};

Filters.Cinema = function CinemaSelect() {
  const { data, isLoading, error } = useGetCinemasQuery(undefined);

  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectCinema);

  if (error) {
    return <span>Not Found</span>;
  }

  return (
    <Select
      options={data === undefined ? [] : data}
      onChange={(id) => dispatch(filtersActions.setCinema(id))}
      selected={data?.find(
        (e: { id: string | undefined }) => e.id === selected
      )}
      placeholder="Выберите кинотеатр"
      label="Кинотеатр"
    ></Select>
  );
};

export default Filters;
