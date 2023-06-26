'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';
interface ModalOptions {
  onClose: () => void;
  onSubmit: () => void;
}

const Modal = function Modal({ onClose, onSubmit }: ModalOptions) {
  const modalContainer = document.getElementById('modal-container');
  const backdropContainer = document.getElementById('backdrop-container');

  return (
    <>
      {backdropContainer &&
        createPortal(<Modal.Backdrop onClose={onClose} />, backdropContainer)}
      {modalContainer &&
        createPortal(
          <Modal.Content onClose={onClose} onSubmit={onSubmit} />,
          modalContainer
        )}
    </>
  );
};

Modal.Content = function ModalContent({ onClose, onSubmit }: ModalOptions) {
  const ref = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
    ref.current && ref.current.focus();
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <div className={styles.headerContainer}>
          <h4 className={styles.header}>Удаление билета</h4>
          <button type="button" onClick={onClose} className={styles.btnClose}>
            <Image src="/close.svg" alt="Close Icon" width={16} height={16} />
          </button>
        </div>
        <span className={styles.content}>
          Вы уверены, что хотите удалить билет?
        </span>
      </div>
      <div className={styles.btnGroup}>
        <button onClick={onSubmit} className={styles.btnYes}>
          <span className={styles.btnYesText}>Да</span>
        </button>
        <button onClick={onClose} className={styles.btnNo} ref={ref}>
          <span className={styles.btnNoText}>Нет</span>
        </button>
      </div>
    </div>
  );
};

Modal.Backdrop = function Backdrop({
  onClose,
}: {
  onClose: ModalOptions['onClose'];
}) {
  return <div className={styles.backdrop} onClick={onClose}></div>;
};

export default Modal;
