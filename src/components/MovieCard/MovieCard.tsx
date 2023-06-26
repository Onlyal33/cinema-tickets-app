import Image from 'next/image';

import { useGetMovieQuery, useGetMoviesQuery } from '@/redux/services/movieApi';

import TicketCountGroup from '../TicketCountGroup/TicketCountGroup';

import styles from './MovieCard.module.css';
import getGenreName from '@/i18n/getGenreName';

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

export default function MovieCard({ id }: { id: string }) {
  return <MovieCardLoading id={id} />;
}

export function MovieCardPreloaded({ id }: { id: string }) {
  const { movie } = useGetMoviesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      movie: data?.find((movie) => movie.id === id),
    }),
  });

  if (!movie) {
    return null;
  }

  return <MovieCardContent movie={movie} />;
}

export function MovieCardLoading({ id }: { id: string }) {
  const { data, isLoading, error } = useGetMovieQuery(id);
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!data || error) {
    return <span>Not Found</span>;
  }

  return <MovieCardContent movie={data} />;
}

function MovieCardContent({ movie }: { movie: MovieInfo }) {
  const {
    title,
    posterUrl,
    releaseYear,
    description,
    genre,
    rating,
    director,
    id,
  } = movie;

  return (
    <div className={styles.container}>
      <div className={styles.posterContainer}>
        <Image
          fill
          className={styles.poster}
          src={posterUrl}
          alt="Poster"
          priority
          sizes="400px"
        ></Image>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.headerContainer}>
            <h2 className={styles.header}>{title}</h2>
            <TicketCountGroup id={id} />
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.detail}>
              <span className={styles.detailName}>Жанр: </span>
              <span className={styles.detailText}>{getGenreName(genre)}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailName}>Год выпуска: </span>
              <span className={styles.detailText}>{releaseYear}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailName}>Рейтинг: </span>
              <span className={styles.detailText}>{rating}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailName}>Режиссер: </span>
              <span className={styles.detailText}>{director}</span>
            </div>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionHeader}>Описание</div>
          <div className={styles.descriptionTextContainer}>
            <span className={styles.descriptionText}>{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
