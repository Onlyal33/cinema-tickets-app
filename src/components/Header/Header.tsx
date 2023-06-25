'use client';
import Link from 'next/link';
import styles from './Header.module.css';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const ticketsCounter = 1;
  return (
    <header className={styles.container}>
      {pathname !== '/' ? (
        <Link href="/" className={styles.text}>
          Билетопоиск
        </Link>
      ) : (
        <div className={styles.text}>Билетопоиск</div>
      )}
      <div className={styles.cartContainer}>
        {ticketsCounter > 0 && (
          <div className={styles.ticketsCountContainer}>
            <span className={styles.ticketsCounter}>{ticketsCounter}</span>
          </div>
        )}
        <Link className={styles.cart} href="/cart">
          <Image

            src="/cart.svg"
            alt="Cart Icon"
            width={32}
            height={32}
          />
        </Link>
      </div>
    </header>
  );
}
