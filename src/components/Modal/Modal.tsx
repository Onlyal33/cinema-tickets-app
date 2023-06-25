import { useEffect } from 'react';
import styles from './Modal.module.css';
import Image from 'next/image';

type Modal = {
  onClose: () => void;
};

export default function Modal({ onClose }: Modal) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  })

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <div className={styles.headerContainer}>
          <h4 className={styles.header}>Удаление билета</h4>
          <button
          type="button"
          onClick={onClose}
          className={styles.btnClose}
        >
          <Image src="/close.svg" alt="Close Icon" width={16} height={16} />
        </button>
        </div>
        <span className={styles.content}>
          Вы уверены, что хотите удалить билет?
        </span>
      </div>
      <div className={styles.btnGroup}>
        <button className={styles.btnYes}>
          <span className={styles.btnYesText}>Да</span>
        </button>
        <button onClick={onClose} className={styles.btnNo}>
          <span className={styles.btnNoText}>Нет</span>
        </button>
      </div>
    </div>
  );
}
