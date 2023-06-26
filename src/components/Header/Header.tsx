'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import TotalTickets from '../TotalTickets/TotalTickets';

import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

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
        <TotalTickets formatted={true}/>
        <Link className={styles.cart} href="/cart">
          <Image src="/cart.svg" alt="Cart Icon" width={32} height={32} />
        </Link>
      </div>
    </header>
  );
}
