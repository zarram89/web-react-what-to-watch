import { useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchFilmAction, postReviewAction, logoutAction } from '../../store/action';
import { AppRoute, AuthorizationStatus } from '../../const';
import CommentSubmissionForm from '../../components/CommentSubmissionForm/CommentSubmissionForm';
import Spinner from '../../components/Spinner/Spinner';
import {
  getFilm,
  getIsFilmLoading,
  getAuthorizationStatus,
  getUser
} from '../../store/selectors';

function AddReviewScreen(): JSX.Element {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const film = useSelector(getFilm);
  const isFilmLoading = useSelector(getIsFilmLoading);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);

  useEffect(() => {
    if (id && (!film || film.id !== Number(id))) {
      dispatch(fetchFilmAction(id));
    }
  }, [dispatch, id, film]);

  const handleLogout = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (id) {
      dispatch(postReviewAction({ id, review: { rating, comment } }))
        .unwrap()
        .then(() => {
          navigate(`/films/${id}`);
        })
        .catch(() => {
          // Error handling can be added here
          // eslint-disable-next-line no-console
          console.error('Failed to post review.');
        });
    }
  };

  if (isFilmLoading) {
    return <Spinner />;
  }

  if (!film) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Add review</span>
              </li>
            </ul>
          </nav>

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

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
        </div>
      </div>

      <CommentSubmissionForm onSubmit={handleReviewSubmit} />

    </section>
  );
}

export default AddReviewScreen;
