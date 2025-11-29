import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Film } from '../types/film';
import { User, AuthData } from '../types/user';
import { APIRoute } from '../const/api-routes';
import { saveToken, dropToken } from '../services/api';

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

export const checkAuthAction = createAsyncThunk<
  User,
  undefined,
  {
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<User>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  User,
  AuthData,
  {
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<User>(APIRoute.Login, { email, password });
  saveToken(data.token);
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
