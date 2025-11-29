import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, loadFilms } from './action';
import { Film } from '../types/film';

type InitialState = {
    genre: string;
    films: Film[];
};

const initialState: InitialState = {
  genre: 'All genres',
  films: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    });
});
