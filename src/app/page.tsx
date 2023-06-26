import Filters from '@/components/Filters/Filters';
import Movies from '@/components/Movies/Movies';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* sticky div */}
      <div>
        <div className={styles.filterColumnContainer}>
          <div className={styles.header}>Фильтр поиска</div>
          <Filters />
        </div>
      </div>
      <Movies />
    </div>
  );
}
