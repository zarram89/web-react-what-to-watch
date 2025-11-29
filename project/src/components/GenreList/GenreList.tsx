import { memo, useMemo } from 'react';
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
  const genres = useMemo(() => getUniqueGenres(films), [films]);

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
          <button
            className="catalog__genres-link"
            type="button"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default memo(GenreList);
