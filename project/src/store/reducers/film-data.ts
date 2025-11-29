import { createReducer } from '@reduxjs/toolkit';
import { fetchFilmAction, fetchSimilarFilmsAction, fetchReviewsAction, toggleFavoriteAction } from '../action';
import { Film } from '../../types/film';
import { Review } from '../../types/review';

type InitialState = {
  film: Film | null;
  similarFilms: Film[];
  reviews: Review[];
  isFilmLoading: boolean;
};

const initialState: InitialState = {
  film: null,
  similarFilms: [],
  reviews: [],
  isFilmLoading: false,
};

export const filmData = createReducer(initialState, (builder) => {
  builder
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
    .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
      if (state.film && state.film.id === action.payload.id) {
        state.film = action.payload;
      }
    });
});
