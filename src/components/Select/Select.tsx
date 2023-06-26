'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './Select.module.css';

interface Option {
  id: string | undefined;
  name: string;
  movieIds: string[];
}

interface SelectProps {
  selected: Option | undefined;
  options: Option[];
  placeholder: string;
  status?: 'default' | 'invalid';
  onChange: (selected: Option['id']) => void;
  onClose?: () => void;
}

interface DropdownItemProps {
  id: string | undefined;
  name: string;
  onClick: (id: Option['id']) => void;
}

export default function Select({
  options,
  placeholder,
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

  const handleOptionClick = (id: Option['id']) => {
    setIsOpen(false);
    onChange?.(id);
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

  return (
    <div className={styles.container} ref={rootRef} data-is-active={isOpen}>
      <label className={styles.label}>Жанр</label>
      <div
        className={classNames(styles.placeholder, isOpen && styles.active)}
        data-status={status}
        onClick={handlePlaceHolderClick}
        role="button"
      >
        {selected?.name || placeholder}

        <Image
          src={isOpen ? '/arrowUpLight.svg' : '/arrowDownLight.svg'}
          alt={isOpen ? 'Arrow Up Icon' : 'Arrow Down Icon'}
          width={20}
          height={20}
        />
      </div>
      {isOpen && (
        <Select.Dropdown
          options={options}
          position={position}
          onClick={handleOptionClick}
        />
      )}
    </div>
  );
}

Select.Dropdown = function Dropdown({
  options,
  position,
  onClick,
}: {
  options: Option[];
  position: {
    x: number;
    y: number;
  } | null;
  onClick: (id: Option['id']) => void;
}) {
  const dropdownContainer = document.getElementById('dropdown-container');

  return (
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
        <Select.DropdownItem
          key="null"
          id={undefined}
          name="Не выбран"
          onClick={onClick}
        />
        {options.map((option) => (
          <Select.DropdownItem
            key={option.id}
            id={option.id}
            name={option.name}
            onClick={onClick}
          />
        ))}
      </ul>,
      dropdownContainer
    )
  );
};

Select.DropdownItem = function DropdownItem({
  id,
  name,
  onClick,
}: DropdownItemProps) {
  return (
    <li className={styles.dropdownItem} value={id} onClick={() => onClick(id)}>
      {name}
    </li>
  );
};
