import Image from 'next/image';
import styles from './MovieCard.module.css';
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup';

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

export default function MovieCard({
  data: { id, title, posterUrl, releaseYear, description, genre, rating, director },
}: {
  data: MovieInfo;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.posterContainer}>
        <Image
          fill
          className={styles.poster}
          src={posterUrl}
          alt="Poster"
          priority
          sizes='400px'
        ></Image>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.headerContainer}>
            <h2 className={styles.header}>{title}</h2>
            <ButtonsGroup id={id}></ButtonsGroup>
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.detail}>
              <span className={styles.detailName}>Жанр: </span>
              <span className={styles.detailText}>{genre}</span>
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
