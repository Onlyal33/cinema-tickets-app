'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Select.module.css';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import DropdownItem from './DropdownItem';
import Image from 'next/image';

interface Option {
  title: string;
  value: string;
}

interface SelectProps {
  selected: Option | null;
  options: Option[];
  placeholder: string;
  status?: 'default' | 'invalid';
  onChange?: (selected: Option['value']) => void;
  onClose?: () => void;
}

export default function Select({
  options = [
    { title: 'qrs', value: 'qrsssss' },
    { title: 'qrspppp', value: 'qrsppppppp' },
  ],
  placeholder = 'Выберите жанр',
  status = 'default',
  selected,
  onChange,
  onClose,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [position, setPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (
        isOpen &&
        target instanceof Node &&
        !rootRef.current?.contains(target)
      ) {
        onClose?.();
        setIsOpen(false);
        setPosition(null);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        /* const bounds = rootRef.current.getBoundingClientRect();
        setPosition({
          x: bounds.left,
          y: bounds.top + bounds.height + 4 - window.scrollY,
        }); */
        setIsOpen(false);
        setPosition(null);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, onClose]);

  const handleOptionClick = (value: Option['value']) => {
    setIsOpen(false);
    onChange?.(value);
  };

  const handlePlaceHolderClick = () => {
    if (!isOpen && rootRef.current) {
      const bounds = rootRef.current.getBoundingClientRect();
      setPosition({
        x: bounds.left,
        y: bounds.top + bounds.height + 4,
      });
    }
    setIsOpen(!isOpen);
  };

  const dropdownContainer = document.getElementById('dropdown-container');

  return (
    <div className={styles.container} ref={rootRef} data-is-active={isOpen}>
      <label className={styles.label}>Жанр</label>
      <div
        className={classNames(styles.placeholder, isOpen && styles.active)}
        data-status={status}
        data-selected={!!selected?.value}
        onClick={handlePlaceHolderClick}
        role="button"
      >
        {selected?.title || placeholder}
        {isOpen ? (
          <Image
            src="/arrowUpLight.svg"
            alt="Arrow Up Icon"
            width={20}
            height={20}
          />
        ) : (
          <Image
            src="/arrowDownLight.svg"
            alt="Arrow Down Icon"
            className={styles.iconColor}
            width={20}
            height={20}
          />
        )}
      </div>
      {isOpen &&
        dropdownContainer &&
        createPortal(
          <ul
            style={{
              top: position?.y,
              left: position?.x,
              position: 'fixed',
              paddingTop: 4,
            }}
            className={styles.dropdownContainer}
          >
            {options.map((option) => (
              <DropdownItem
                key={option.value}
                option={option}
                onClick={handleOptionClick}
              />
            ))}
          </ul>,
          dropdownContainer
        )}
    </div>
  );
}
