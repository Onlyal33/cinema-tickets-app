import styles from './Footer.module.css';
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.container}>
      <Link href="/help" className={styles.text}>Вопросы-ответы</Link>
      <Link href="/about" className={styles.text}>О нас</Link>
    </footer>
  );
}
