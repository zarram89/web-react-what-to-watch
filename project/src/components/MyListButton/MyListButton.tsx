import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { toggleFavoriteAction } from '../../store/action';
import { getAuthorizationStatus } from '../../store/selectors';
import { AuthorizationStatus, AppRoute } from '../../const';

type MyListButtonProps = {
    filmId: number;
    isFavorite: boolean;
    count?: number;
};

function MyListButton({ filmId, isFavorite, count }: MyListButtonProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const handleClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.SignIn);
      return;
    }

    const status = isFavorite ? 0 : 1;
    dispatch(toggleFavoriteAction({ id: filmId, status }));
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      {count !== undefined && <span className="film-card__count">{count}</span>}
    </button>
  );
}

export default MyListButton;
