import { createReducer } from '@reduxjs/toolkit';
import { changeGenre } from '../action';

type InitialState = {
  genre: string;
};

const initialState: InitialState = {
  genre: 'All genres',
};

export const appProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    });
});
