import styles from './Modal.module.css';

export default function Backdrop({ onClick }: { onClick: () => void }) {
  return <div className={styles.backdrop} onClick={onClick}></div>;
}
