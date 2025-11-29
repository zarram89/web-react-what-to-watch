/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '../services/api';
import {
  fetchFilmsAction,
  fetchFilmAction,
  fetchSimilarFilmsAction,
  fetchReviewsAction,
  postReviewAction,
  toggleFavoriteAction,
  fetchFavoriteFilmsAction,
  checkAuthAction,
} from './action';
import { makeFakeFilm, makeFakeFilms, makeFakeReviews, makeFakeUser } from '../utils/test-utils';
import { APIRoute } from '../const/api-routes';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument({ api })];
  const mockStore = configureMockStore(middlewares);

  describe('fetchFilmsAction', () => {
    it('should dispatch fetchFilmsAction when GET /films', async () => {
      const fakeFilms = makeFakeFilms(3);
      mockAPI.onGet(APIRoute.Films).reply(200, fakeFilms);

      const store = mockStore();
      // @ts-ignore
      await store.dispatch(fetchFilmsAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchFilmsAction.pending.type);
      expect(actions).toContain(fetchFilmsAction.fulfilled.type);
    });
  });

  describe('fetchFilmAction', () => {
    it('should dispatch fetchFilmAction when GET /films/:id', async () => {
      const fakeFilm = makeFakeFilm();
      mockAPI.onGet(`${APIRoute.Films}/1`).reply(200, fakeFilm);

      const store = mockStore();
      // @ts-ignore
      await store.dispatch(fetchFilmAction('1'));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchFilmAction.pending.type);
      expect(actions).toContain(fetchFilmAction.fulfilled.type);
    });
  });

  describe('fetchSimilarFilmsAction', () => {
    it('should dispatch fetchSimilarFilmsAction when GET /films/:id/similar', async () => {
      const fakeFilms = makeFakeFilms(3);
      mockAPI.onGet(`${APIRoute.Films}/1/similar`).reply(200, fakeFilms);

      const store = mockStore();
      // @ts-ignore
      await store.dispatch(fetchSimilarFilmsAction('1'));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchSimilarFilmsAction.pending.type);
      expect(actions).toContain(fetchSimilarFilmsAction.fulfilled.type);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch fetchReviewsAction when GET /comments/:id', async () => {
      const fakeReviews = makeFakeReviews(3);
      mockAPI.onGet(`${APIRoute.Reviews}/1`).reply(200, fakeReviews);

      const store = mockStore();
      // @ts-ignore
      await store.dispatch(fetchReviewsAction('1'));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchReviewsAction.pending.type);
      expect(actions).toContain(fetchReviewsAction.fulfilled.type);
    });
  });

  describe('postReviewAction', () => {
    it('should dispatch postReviewAction when POST /comments/:id', async () => {
      mockAPI.onPost(`${APIRoute.Reviews}/1`).reply(200);

      const store = mockStore();
      const reviewData = { comment: 'Test comment', rating: 8 };
      // @ts-ignore - mock store dispatch typing issue
      await store.dispatch(postReviewAction({ id: '1', review: reviewData }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(postReviewAction.pending.type);
      expect(actions).toContain(postReviewAction.fulfilled.type);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should dispatch toggleFavoriteAction when POST /favorite/:id/:status', async () => {
      const fakeFilm = { ...makeFakeFilm(), isFavorite: true };
      mockAPI.onPost(`${APIRoute.Favorite}/1/1`).reply(200, fakeFilm);

      const store = mockStore();
      // @ts-ignore
      await store.dispatch(toggleFavoriteAction({ id: 1, status: 1 }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(toggleFavoriteAction.pending.type);
      expect(actions).toContain(toggleFavoriteAction.fulfilled.type);
    });
  });

  describe('fetchFavoriteFilmsAction', () => {
    it('should dispatch fetchFavoriteFilmsAction when GET /favorite', async () => {
      const fakeFilms = makeFakeFilms(2);
      mockAPI.onGet(APIRoute.Favorite).reply(200, fakeFilms);

      const store = mockStore();
      // @ts-ignore
      await store.dispatch(fetchFavoriteFilmsAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(fetchFavoriteFilmsAction.pending.type);
      expect(actions).toContain(fetchFavoriteFilmsAction.fulfilled.type);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch checkAuthAction when GET /login', async () => {
      const fakeUser = makeFakeUser();
      mockAPI.onGet(APIRoute.Login).reply(200, fakeUser);

      const store = mockStore();
      // @ts-ignore
      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toContain(checkAuthAction.pending.type);
      expect(actions).toContain(checkAuthAction.fulfilled.type);
    });
  });
});
