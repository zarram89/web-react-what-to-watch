import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/MainScreen/MainScreen';
import SignInScreen from '../../pages/SignInScreen/SignInScreen';
import MyListScreen from '../../pages/MyListScreen/MyListScreen';
import MovieScreen from '../../pages/MovieScreen/MovieScreen';
import AddReviewScreen from '../../pages/AddReviewScreen/AddReviewScreen';
import PlayerScreen from '../../pages/PlayerScreen/PlayerScreen';
import NotFoundScreen from '../../pages/NotFoundScreen/NotFoundScreen';
import PrivateRoute from '../private-route/PrivateRoute';
import Spinner from '../Spinner/Spinner';
import { fetchFilmsAction, checkAuthAction } from '../../store/action';
import { AppDispatch } from '../../store';
import { getIsFilmsLoading, getFilms } from '../../store/selectors';

type AppProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmYear: number;
};

function App({ promoFilmTitle, promoFilmGenre, promoFilmYear }: AppProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(getIsFilmsLoading);
  const films = useSelector(getFilms);

  useEffect(() => {
    dispatch(fetchFilmsAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <MainScreen
            promoFilmTitle={promoFilmTitle}
            promoFilmGenre={promoFilmGenre}
            promoFilmReleased={promoFilmYear}
          />
        }
      />
      <Route
        path={AppRoute.SignIn}
        element={<SignInScreen />}
      />
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute>
            <MyListScreen />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Film}
        element={<MovieScreen />}
      />
      <Route
        path={AppRoute.AddReview}
        element={
          <PrivateRoute>
            <AddReviewScreen />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Player}
        element={<PlayerScreen films={films} />}
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;
