import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { NameSpace } from '../const/name-space';

// App Process
export const getGenre = (state: RootState) => state[NameSpace.App].genre;

// User Process
export const getAuthorizationStatus = (state: RootState) => state[NameSpace.User].authorizationStatus;
export const getUser = (state: RootState) => state[NameSpace.User].user;

// Films Data
export const getFilms = (state: RootState) => state[NameSpace.Data].films;
export const getIsFilmsLoading = (state: RootState) => state[NameSpace.Data].isLoading;
export const getHasError = (state: RootState) => state[NameSpace.Data].hasError;
export const getFavoriteFilms = (state: RootState) => state[NameSpace.Data].favoriteFilms;
export const getFavoriteCount = (state: RootState) => state[NameSpace.Data].favoriteFilms.length;

// Film Data
export const getFilm = (state: RootState) => state[NameSpace.Film].film;
export const getSimilarFilms = (state: RootState) => state[NameSpace.Film].similarFilms;
export const getReviews = (state: RootState) => state[NameSpace.Film].reviews;
export const getIsFilmLoading = (state: RootState) => state[NameSpace.Film].isFilmLoading;

// Memoized Selectors
export const getFilteredFilms = createSelector(
  [getFilms, getGenre],
  (films, genre) => {
    if (genre === 'All genres') {
      return films;
    }
    return films.filter((film) => film.genre === genre);
  }
);
