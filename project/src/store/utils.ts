import { Film } from '../types/film';

export const getFilmsByGenre = (films: Film[], genre: string): Film[] => {
  if (genre === 'All genres') {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};

export const getUniqueGenres = (films: Film[]): string[] => {
  const genres = films.map((film) => film.genre);
  const uniqueGenres = Array.from(new Set(genres));
  // Limit to maximum 9 genres + "All genres"
  return ['All genres', ...uniqueGenres.slice(0, 9)];
};
