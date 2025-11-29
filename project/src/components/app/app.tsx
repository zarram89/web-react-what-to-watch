import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../../pages/MainScreen/MainScreen';
import SignInScreen from '../../pages/SignInScreen/SignInScreen';
import MyListScreen from '../../pages/MyListScreen/MyListScreen';
import MovieScreen from '../../pages/MovieScreen/MovieScreen';
import AddReviewScreen from '../../pages/AddReviewScreen/AddReviewScreen';
import PlayerScreen from '../../pages/PlayerScreen/PlayerScreen';
import NotFoundScreen from '../../pages/NotFoundScreen/NotFoundScreen';
import PrivateRoute from '../private-route/PrivateRoute';

type AppProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmYear: number;
};

function App({ promoFilmTitle, promoFilmGenre, promoFilmYear }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainScreen
              promoFilmTitle={promoFilmTitle}
              promoFilmGenre={promoFilmGenre}
              promoFilmYear={promoFilmYear}
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
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
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
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <AddReviewScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerScreen />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
