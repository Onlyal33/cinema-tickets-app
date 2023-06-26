'use client';

import MovieCard from '@/components/MovieCard/MovieCard';
import ReviewCard, { ReviewInfo } from '@/components/ReviewCard/ReviewCard';
import { useGetReviewsByMovieQuery } from '@/redux/services/reviewApi';
import styles from './page.module.css';

function Reviews({ id }: { id: string }) {
  const { data, isLoading, error } = useGetReviewsByMovieQuery(id);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!data || error) {
    return <span>Not Found</span>;
  }

  return (
    data.length > 0 &&
    data.map((review: ReviewInfo) => (
      <ReviewCard key={review.id} data={review}></ReviewCard>
    ))
  );
}

export default function MoviePage({ params }: { params: { id: string } }) {
  return (
    <div className={styles.container}>
      <MovieCard id={params.id} />
      <Reviews id={params.id} />
    </div>
  );
}
