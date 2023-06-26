const genreNames = {
  action: 'Боевик',
  comedy: 'Комедия',
  fantasy: 'Фэнтези',
  horror: 'Ужасы',
};
export default function getGenreName(id: string | undefined) {
  return id && genreNames[id as keyof typeof genreNames];
}
