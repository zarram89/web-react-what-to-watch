import { useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchFilmAction, fetchSimilarFilmsAction, fetchReviewsAction, logoutAction } from '../../store/action';
import { AppRoute, AuthorizationStatus } from '../../const';
import FilmsList from '../../components/FilmsList/FilmsList';
import Tabs from '../../components/Tabs/Tabs';
import Spinner from '../../components/Spinner/Spinner';
import MyListButton from '../../components/MyListButton/MyListButton';
import {
  getFilm,
  getSimilarFilms,
  getReviews,
  getIsFilmLoading,
  getAuthorizationStatus,
  getUser,
  getFavoriteCount
} from '../../store/selectors';

function MovieScreen(): JSX.Element {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const film = useSelector(getFilm);
  const similarFilms = useSelector(getSimilarFilms);
  const reviews = useSelector(getReviews);
  const isLoading = useSelector(getIsFilmLoading);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);
  const favoriteCount = useSelector(getFavoriteCount);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
      dispatch(fetchSimilarFilmsAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [id, dispatch]);

  const handleLogout = useCallback((evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!film) {
    return <Spinner />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
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
                    <Link to={AppRoute.MyList} className="user-block__link">
                      My list <span className="user-block__item-count">{favoriteCount}</span>
                    </Link>
                  </li>
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
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${film.id}`} className="btn btn--play film-card__button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <MyListButton
                  filmId={film.id}
                  isFavorite={film.isFavorite}
                  count={favoriteCount}
                />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Link to={`/films/${film.id}/review`} className="btn film-card__button">
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs film={film} reviews={reviews} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilms.slice(0, 4)} />
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

export default MovieScreen;
