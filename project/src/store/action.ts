import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Film } from '../types/film';
import { APIRoute } from '../const/api-routes';

export const changeGenre = createAction<string>('films/changeGenre');

export const fetchFilmsAction = createAsyncThunk<
    Film[],
    undefined,
    {
        extra: AxiosInstance;
    }
>('films/fetchFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<Film[]>(APIRoute.Films);
  return data;
});
