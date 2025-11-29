import { createReducer } from '@reduxjs/toolkit';
import { fetchFilmsAction } from '../action';
import { Film } from '../../types/film';

type InitialState = {
  films: Film[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  films: [],
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
    });
});
