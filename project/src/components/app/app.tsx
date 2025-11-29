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

import { Film } from '../../types/film';

type AppProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmYear: number;
  films: Film[];
};

function App({ promoFilmTitle, promoFilmGenre, promoFilmYear, films }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainScreen
              promoFilmTitle={promoFilmTitle}
              promoFilmGenre={promoFilmGenre}
              promoFilmReleased={promoFilmYear}
              films={films}
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
              <MyListScreen films={films} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<MovieScreen films={films} />}
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <AddReviewScreen films={films} />
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
    </BrowserRouter>
  );
}

export default App;
