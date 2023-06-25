import styles from './Select.module.css';

interface Option { title: string; value: string };

interface OptionProps {
  option: Option;
  onClick: (value: Option['value']) => void;
};

export default function DropdownItem({
  option: { value, title },
  onClick,
}: OptionProps) {
  return (
    <li
      className={styles.dropdownItem}
      value={value}
      onClick={() => onClick(value)}
    >
      {title}
    </li>
  );
}
