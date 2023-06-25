import MoviesList from '@/components/MoviesList/MoviesList';
import FilterGroup from '@/components/FilterGroup/FilterGroup';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* sticky div */}
      <div>
        <div className={styles.filterColumnContainer}>
          <div className={styles.header}>Фильтр поиска</div>
          <FilterGroup></FilterGroup>
        </div>
      </div>
      <MoviesList></MoviesList>
    </div>
  );
}
