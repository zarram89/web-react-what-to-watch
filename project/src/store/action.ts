import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Film } from '../types/film';
import { User, AuthData } from '../types/user';
import { Review, ReviewData } from '../types/review';
import { APIRoute } from '../const/api-routes';
import { saveToken, dropToken } from '../services/api';

export const changeGenre = createAction<string>('films/changeGenre');

export const fetchFilmsAction = createAsyncThunk<
  Film[],
  undefined,
  {
    extra: { api: AxiosInstance };
  }
>('films/fetchFilms', async (_arg, { extra: { api } }) => {
  const { data } = await api.get<Film[]>(APIRoute.Films);
  return data;
});

export const fetchFilmAction = createAsyncThunk<
  Film,
  string,
  {
    extra: { api: AxiosInstance };
  }
>('films/fetchFilm', async (id, { extra: { api } }) => {
  const { data } = await api.get<Film>(`${APIRoute.Films}/${id}`);
  return data;
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  Film[],
  string,
  {
    extra: { api: AxiosInstance };
  }
>('films/fetchSimilarFilms', async (id, { extra: { api } }) => {
  const { data } = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  string,
  {
    extra: { api: AxiosInstance };
  }
>('films/fetchReviews', async (id, { extra: { api } }) => {
  const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
  return data;
});

export const postReviewAction = createAsyncThunk<
  void,
  { id: string; review: ReviewData },
  {
    extra: { api: AxiosInstance };
  }
>('films/postReview', async ({ id, review }, { extra: { api } }) => {
  await api.post(`${APIRoute.Reviews}/${id}`, review);
});

export const checkAuthAction = createAsyncThunk<
  User,
  undefined,
  {
    extra: { api: AxiosInstance };
  }
>('user/checkAuth', async (_arg, { extra: { api } }) => {
  const { data } = await api.get<User>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  User,
  AuthData,
  {
    extra: { api: AxiosInstance };
  }
>('user/login', async ({ email, password }, { extra: { api } }) => {
  const { data } = await api.post<User>(APIRoute.Login, { email, password });
  saveToken(data.token);
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    extra: { api: AxiosInstance };
  }
>('user/logout', async (_arg, { extra: { api } }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
