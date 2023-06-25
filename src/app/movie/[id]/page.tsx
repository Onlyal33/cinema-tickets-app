import MovieCard, { MovieInfo } from '@/components/MovieCard/MovieCard';
import styles from './page.module.css';
import ReviewCard, { ReviewInfo } from '@/components/ReviewCard/ReviewCard';

export default function MoviePage({ params }: { params: { id: string } }) {
  const reviews: ReviewInfo[] = [
    { name: 'ttt', text: 'ftftft', rating: 4, id: 'sss' },
  ];
  const movieInfo: MovieInfo = {
    title: 'strstrst',
    posterUrl: 'https://i.postimg.cc/pdCLNMqX/1.webp',
    releaseYear: 2000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    genre: 'ttttt',
    id: params.id,
    rating: 8,
    director: 'tttttttt',
    reviewIds: [],
  };
  return (
    <div className={styles.container}>
      <MovieCard data={movieInfo}></MovieCard>
      {reviews.length > 0 &&
        reviews.map((review) => (
          <ReviewCard key={review.id} data={review}></ReviewCard>
        ))}
    </div>
  );
}
