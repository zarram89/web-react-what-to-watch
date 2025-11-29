import { createReducer } from '@reduxjs/toolkit';
import { fetchFilmsAction, fetchFavoriteFilmsAction, toggleFavoriteAction } from '../action';
import { Film } from '../../types/film';

type InitialState = {
  films: Film[];
  favoriteFilms: Film[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  films: [],
  favoriteFilms: [],
  isLoading: false,
  hasError: false,
};

export const filmsData = createReducer(initialState, (builder) => {
  builder
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
    .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
      state.favoriteFilms = action.payload;
    })
    .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
      const updatedFilm = action.payload;
      // Update in films array
      const filmIndex = state.films.findIndex((f) => f.id === updatedFilm.id);
      if (filmIndex !== -1) {
        state.films[filmIndex] = updatedFilm;
      }
      // Update in favoriteFilms array
      if (updatedFilm.isFavorite) {
        const existsInFavorites = state.favoriteFilms.some((f) => f.id === updatedFilm.id);
        if (!existsInFavorites) {
          state.favoriteFilms.push(updatedFilm);
        }
      } else {
        state.favoriteFilms = state.favoriteFilms.filter((f) => f.id !== updatedFilm.id);
      }
    });
});
