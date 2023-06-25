'use client';
import { useState } from 'react';
import Input from '../Input/Input';
import Select from '../Select/Select';
import styles from './FilterGroup.module.css';

const handleSelect = (setState: (value: string) => void) => (value: string) => {
  setState(value);
};

const handleChangeField =
  (setFieldState: (value: string) => void) =>
  ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFieldState(target.value);
  };

const genres = [
  { title: 'qrs', value: 'qrsssss' },
  { title: 'qrspppp', value: 'qrsppppppp' },
];

const cinemas = [
  { title: 'qrs', value: 'qrsssss' },
  { title: 'qrspppp', value: 'qrsppppppp' },
];

export default function FilterGroup() {
  const [genre, setGenre] = useState<string | null>(null);

  const selectedGenre = genres.find((item) => item.value === genre) || null;

  const [cinema, setCinema] = useState<string | null>(null);

  const selectedCinema = cinemas.find((item) => item.value === cinema) || null;

  const [title, setTitle] = useState<string>('');
  return (
    <div className={styles.container}>
      <Input
        onChange={handleChangeField(setTitle)}
        label="Название"
        placeholder="Введите название"
        value={title}
      ></Input>
      <Select
        onChange={handleSelect(setGenre)}
        options={genres}
        placeholder="Выберите жанр"
        selected={selectedGenre}
      ></Select>
      <Select
        onChange={handleSelect(setCinema)}
        options={cinemas}
        placeholder="Выберите кинотеатр"
        selected={selectedCinema}
      ></Select>
    </div>
  );
}
