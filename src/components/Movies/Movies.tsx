'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import getGenreName from '@/i18n/getGenreName';
import { selectIdsWithPositiveAmount } from '@/redux/features/cart/selector';
import {
  selectCinema,
  selectGenre,
  selectTitle,
} from '@/redux/features/filters/selector';
import { useAppSelector } from '@/redux/hooks';
import { useGetCinemasQuery } from '@/redux/services/cinemaApi';
import { MovieInfo, useGetMoviesQuery } from '@/redux/services/movieApi';

import TicketCountGroup from '../TicketCountGroup/TicketCountGroup';
import styles from './Movies.module.css';
import { shallowEqual } from 'react-redux';

interface MovieOptions {
  data: MovieInfo[];
  type?: 'list' | 'cart';
}

const Cover = dynamic(() => import('./Cover'));

const Movies = function Movies({
  type = 'list',
}: {
  type?: MovieOptions['type'];
}) {
  const { data, isLoading, error } = useGetMoviesQuery(undefined);

  if (isLoading) {
    return (
      <div className={styles.containerL}>
        <div className={styles.containerL2}>
          <div className={styles.movieName}>Загрузка...</div>
        </div>
      </div>
    );
  }

  if (!data || error) {
    return <span>Not Found</span>;
  }

  return type === 'cart' ? (
    <Movies.Cart data={data} type={type} />
  ) : (
    <Movies.List data={data} type={type} />
  );
};

Movies.Cart = function MoviesCart({ data, type }: MovieOptions) {
  const ids = useAppSelector(selectIdsWithPositiveAmount, shallowEqual);
  const filteredMovies = data.filter(({ id }) => ids.includes(id));
  return <Movies.View data={filteredMovies} type={type} />;
};

Movies.List = function MoviesList({ data, type }: MovieOptions) {
  const title = useAppSelector(selectTitle);
  const genre = useAppSelector(selectGenre);
  const cinema = useAppSelector(selectCinema);
  const { data: cinemas, isLoading, error } = useGetCinemasQuery(undefined);

  if (!cinemas) {
    return null;
  }

  const filteredMovies = data
    .filter((e) => title === '' || e.title.toLowerCase().includes(title))
    .filter((e) => !genre || e.genre === genre)
    .filter(
      (e) =>
        !cinema || cinemas.find((e) => e.id === cinema)?.movieIds.includes(e.id)
    );

  return <Movies.View data={filteredMovies} type={type} />;
};

Movies.View = function MoviesView({ data, type }: MovieOptions) {
  return (
    <div className={styles.container}>
      {data.map((movie, index) => (
        <Movies.CompactCard
          id={movie.id}
          key={movie.id}
          priority={index === 0}
          type={type}
        />
      ))}
    </div>
  );
};

Movies.CompactCard = function MovieCompactCard({
  id,
  priority = false,
  type = 'list',
}: {
  id: string;
  priority: boolean;
  type?: MovieOptions['type'];
}) {
  const { movie } = useGetMoviesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      movie: data?.find((movie) => movie.id === id),
    }),
  });

  if (!movie) {
    return null;
  }

  const { title, posterUrl, genre } = movie;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.movieCoverContainer}>
        <Cover priority={priority} src={posterUrl}></Cover>
      </div>
      <div className={styles.textAndButtonsContainer}>
        <div className={styles.textContainer}>
          <Link className={styles.movieName} href={`/movie/${id}`}>
            {title}
          </Link>
          <div className={styles.movieGenre}>{getGenreName(genre)}</div>
        </div>
        <TicketCountGroup id={id} type={type} />
      </div>
    </div>
  );
};

export default Movies;
