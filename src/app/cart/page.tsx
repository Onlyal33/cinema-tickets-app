'use client';
import TotalTickets from '@/components/TotalTickets/TotalTickets';
import styles from './page.module.css';
import MoviesList from '@/components/MoviesList/MoviesList';

export default function CartPage() {
  return (
    <div className={styles.container}>
      <MoviesList type="cart" />
      <div className={styles.cartContainer}>
        <div className={styles.cartContainer2}>
          <div className={styles.cartContainer3}>
            <div className={styles.cartContainer4}>
              <span className={styles.total}>Итого билетов:</span>
              <span className={styles.total}>
                <TotalTickets />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
