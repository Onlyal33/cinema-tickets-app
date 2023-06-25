'use client';
import styles from './ButtonsGroup.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { createPortal } from 'react-dom';
import Backdrop from '../Modal/Backdrop';
import Image from 'next/image';
import ButtonWithIcon from './ButtonWithIcon';

export default function ButtonsGroup({
  id,
  type = 'list',
}: {
  id: string;
  type?: string;
}) {
  const [counter, setCounter] = useState(0);
  const decrementDisabled = counter < 1;
  const incrementDisabled = counter > 29;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContainer = document.getElementById('modal-container');
  const backdropContainer = document.getElementById('backdrop-container');

  const onClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={styles.container}>
      <ButtonWithIcon
        disabled={decrementDisabled}
        onClick={() => {
          if (counter === 1) {
            setIsModalOpen(true);
          } else {
            setCounter(counter - 1);
          }
        }}
        icon="minus"
      />
      <div className={styles.counter}>{counter}</div>
      <ButtonWithIcon
        disabled={incrementDisabled}
        onClick={() => setCounter(counter + 1)}
        icon="plus"
      />
      {type === 'cart' && (
        <Image
          onClick={() => setIsModalOpen(true)}
          src="/close.svg"
          alt="Close Icon"
          width={20}
          height={20}
        />
      )}
      {backdropContainer &&
        isModalOpen &&
        createPortal(<Backdrop onClick={onClose} />, backdropContainer)}
      {modalContainer &&
        isModalOpen &&
        createPortal(<Modal onClose={onClose} />, modalContainer)}
    </div>
  );
}
