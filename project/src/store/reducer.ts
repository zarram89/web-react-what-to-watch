import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, fetchFilmsAction } from './action';
import { Film } from '../types/film';

type InitialState = {
  genre: string;
  films: Film[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  genre: 'All genres',
  films: [],
  isLoading: false,
  hasError: false,
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
    });
});
