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
          onMouseOver={() => void 0}
          onMouseOut={() => void 0}
        />
      ))}
    </div>
  );
}

export default FilmsList;
