import Link from 'next/link';
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup';
import { MovieInfo } from '../MovieCard/MovieCard';
import styles from './MovieCompactCard.module.css';
import Image from 'next/image';

export default function MovieCompactCard({
  data: { id, title, posterUrl, genre }, priority = false, type = 'list',
}: {
  data: MovieInfo, priority: boolean, type: 'list' | 'cart';
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.movieCoverContainer}>
        <Image fill priority={priority} alt="Cover" src={posterUrl} className={styles.movieCover} sizes='100px'></Image>
      </div>
      <div className={styles.textAndButtonsContainer}>
        <div className={styles.textContainer}>
          <Link className={styles.movieName} href={`/movie/${id}`}>{title}</Link>
          <div className={styles.movieGenre}>{genre}</div>
        </div>
        <ButtonsGroup id={id} type={type}/>
      </div>
    </div>
  );
}
