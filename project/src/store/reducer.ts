import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  fetchFilmsAction,
  fetchFilmAction,
  fetchSimilarFilmsAction,
  fetchReviewsAction,
  checkAuthAction,
  loginAction,
  logoutAction
} from './action';
import { Film } from '../types/film';
import { User } from '../types/user';
import { Review } from '../types/review';
import { AuthorizationStatus } from '../const';

type InitialState = {
  genre: string;
  films: Film[];
  film: Film | null;
  similarFilms: Film[];
  reviews: Review[];
  isLoading: boolean;
  isFilmLoading: boolean;
  hasError: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: InitialState = {
  genre: 'All genres',
  films: [],
  film: null,
  similarFilms: [],
  reviews: [],
  isLoading: false,
  isFilmLoading: false,
  hasError: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(fetchFilmsAction.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })
    .addCase(fetchFilmsAction.fulfilled, (state, action) => {
      state.films = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchFilmsAction.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    })
    .addCase(fetchFilmAction.pending, (state) => {
      state.isFilmLoading = true;
    })
    .addCase(fetchFilmAction.fulfilled, (state, action) => {
      state.film = action.payload;
      state.isFilmLoading = false;
    })
    .addCase(fetchFilmAction.rejected, (state) => {
      state.isFilmLoading = false;
    })
    .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(fetchReviewsAction.fulfilled, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    });
});
