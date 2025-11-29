import { memo } from 'react';
import { Film } from '../../types/film';
import SmallMovieCard from '../SmallMovieCard/SmallMovieCard';

type FilmsListProps = {
  films: Film[];
};

function FilmsList({ films }: FilmsListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <SmallMovieCard
          key={film.id}
          film={film}
        />
      ))}
    </div>
  );
}

export default memo(FilmsList);
