import Accordion from '@/components/Accordion/Accordion';
import styles from './page.module.css';

const questions = [
  {
    header: 'Что такое Билетопоиск?',
    text: 'Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.',
    id: 0,
  },
  {
    header: 'Какой компании принадлежит Билетопоиск?',
    text: 'АО Билетопоиск',
    id: 1,
  },
  { header: 'Как купить билет на Билетопоиск?', text: 'Пока никак', id: 2 },
  {
    header: 'Как оставить отзыв на Билетопоиск?',
    text: 'Написать по адресу: Москва, Академика Королева, 12, Спортлото',
    id: 3,
  },
];

export default function Help() {
  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Вопросы-ответы</h1>
      </div>
      <Accordion items={questions}></Accordion>
    </section>
  );
}
