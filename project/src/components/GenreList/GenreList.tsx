import { useDispatch } from 'react-redux';
import { Film } from '../../types/film';
import { changeGenre } from '../../store/action';
import { getUniqueGenres } from '../../store/utils';

type GenreListProps = {
    films: Film[];
    currentGenre: string;
};

function GenreList({ films, currentGenre }: GenreListProps): JSX.Element {
  const dispatch = useDispatch();
  const genres = getUniqueGenres(films);

  const handleGenreClick = (genre: string) => {
    dispatch(changeGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${genre === currentGenre ? 'catalog__genres-item--active' : ''}`}
        >
          <a
            href="#"
            className="catalog__genres-link"
            onClick={(e) => {
              e.preventDefault();
              handleGenreClick(genre);
            }}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
