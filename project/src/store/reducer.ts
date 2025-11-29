import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, fetchFilmsAction, checkAuthAction, loginAction, logoutAction } from './action';
import { Film } from '../types/film';
import { User } from '../types/user';
import { AuthorizationStatus } from '../const';

type InitialState = {
  genre: string;
  films: Film[];
  isLoading: boolean;
  hasError: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: InitialState = {
  genre: 'All genres',
  films: [],
  isLoading: false,
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
