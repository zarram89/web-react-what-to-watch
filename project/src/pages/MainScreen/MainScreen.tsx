import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FilmsList from '../../components/FilmsList/FilmsList';
import GenreList from '../../components/GenreList/GenreList';
import ShowMoreButton from '../../components/ShowMoreButton/ShowMoreButton';
import { AppRoute, AuthorizationStatus } from '../../const';
import { AppDispatch } from '../../store';
import { logoutAction } from '../../store/action';
import {
  getGenre,
  getHasError,
  getAuthorizationStatus,
  getUser,
  getFilteredFilms
} from '../../store/selectors';

const FILMS_PER_STEP = 8;

type MainScreenProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmReleased: number;
};

function MainScreen({ promoFilmTitle, promoFilmGenre, promoFilmReleased }: MainScreenProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const currentGenre = useSelector(getGenre);
  const hasError = useSelector(getHasError);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);
  const filteredFilms = useSelector(getFilteredFilms);

  const [shownFilmsCount, setShownFilmsCount] = useState(FILMS_PER_STEP);

  useEffect(() => {
    setShownFilmsCount(FILMS_PER_STEP);
  }, [currentGenre]);

  const handleShowMore = useCallback(() => {
    setShownFilmsCount((prevCount) => prevCount + FILMS_PER_STEP);
  }, []);

  const handleLogout = useCallback((evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  }, [dispatch]);

  const filmsToShow = filteredFilms.slice(0, shownFilmsCount);
  const hasMoreFilms = shownFilmsCount < filteredFilms.length;

  if (hasError) {
    return (
      <div className="error-message">
        <h1>Failed to load films</h1>
        <p>The server is currently unavailable. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={promoFilmTitle} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <ul className="user-block">
            {authorizationStatus === AuthorizationStatus.Auth ? (
              <>
                <li className="user-block__item">
                  <div className="user-block__avatar">
                    <img src={user?.avatarUrl || 'img/avatar.jpg'} alt="User avatar" width="63" height="63" />
                  </div>
                </li>
                <li className="user-block__item">
                  <Link className="user-block__link" to="/" onClick={handleLogout}>Sign out</Link>
                </li>
              </>
            ) : (
              <li className="user-block__item">
                <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>
              </li>
            )}
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt={`${promoFilmTitle} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilmTitle}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilmGenre}</span>
                <span className="film-card__year">{promoFilmReleased}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={filteredFilms} currentGenre={currentGenre} />

          <FilmsList films={filmsToShow} />

          {hasMoreFilms && <ShowMoreButton onClick={handleShowMore} />}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainScreen;
