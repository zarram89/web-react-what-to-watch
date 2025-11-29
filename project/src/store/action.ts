import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';

export const changeGenre = createAction<string>('films/changeGenre');
export const loadFilms = createAction<Film[]>('films/loadFilms');
