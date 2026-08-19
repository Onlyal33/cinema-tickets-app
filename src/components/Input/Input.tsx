import type { ChangeEventHandler } from 'react';
import styles from './Input.module.css';

type InputOptions = {
  label: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export default function Input(props: InputOptions) {
  const {
    label,
    placeholder,
    onChange,
    value,
  } = props
  return (
    <label className={styles.label}>
      {label}
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
