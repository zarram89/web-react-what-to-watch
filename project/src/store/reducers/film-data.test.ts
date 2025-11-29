import { filmData } from './film-data';
import {
  fetchFilmAction,
  fetchSimilarFilmsAction,
  fetchReviewsAction,
  toggleFavoriteAction,
} from '../action';
import { makeFakeFilm, makeFakeFilms, makeFakeReviews } from '../../utils/test-utils';

describe('filmData reducer', () => {
  it('should return initial state when called with undefined state', () => {
    const expectedState = {
      film: null,
      similarFilms: [],
      reviews: [],
      isFilmLoading: false,
    };
    const result = filmData(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual(expectedState);
  });

  describe('fetchFilmAction', () => {
    it('should set isFilmLoading to true on pending', () => {
      const initialState = {
        film: null,
        similarFilms: [],
        reviews: [],
        isFilmLoading: false,
      };
      const result = filmData(initialState, fetchFilmAction.pending('', '1'));

      expect(result.isFilmLoading).toBe(true);
    });

    it('should load film and set isFilmLoading to false on fulfilled', () => {
      const initialState = {
        film: null,
        similarFilms: [],
        reviews: [],
        isFilmLoading: true,
      };
      const fakeFilm = makeFakeFilm();
      const result = filmData(initialState, fetchFilmAction.fulfilled(fakeFilm, '', '1'));

      expect(result.film).toEqual(fakeFilm);
      expect(result.isFilmLoading).toBe(false);
    });

    it('should set isFilmLoading to false on rejected', () => {
      const initialState = {
        film: null,
        similarFilms: [],
        reviews: [],
        isFilmLoading: true,
      };
      const result = filmData(initialState, fetchFilmAction.rejected(null, '', '1'));

      expect(result.isFilmLoading).toBe(false);
    });
  });

  describe('fetchSimilarFilmsAction', () => {
    it('should load similar films on fulfilled', () => {
      const initialState = {
        film: null,
        similarFilms: [],
        reviews: [],
        isFilmLoading: false,
      };
      const fakeFilms = makeFakeFilms(3);
      const result = filmData(initialState, fetchSimilarFilmsAction.fulfilled(fakeFilms, '', '1'));

      expect(result.similarFilms).toEqual(fakeFilms);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should load reviews on fulfilled', () => {
      const initialState = {
        film: null,
        similarFilms: [],
        reviews: [],
        isFilmLoading: false,
      };
      const fakeReviews = makeFakeReviews(3);
      const result = filmData(initialState, fetchReviewsAction.fulfilled(fakeReviews, '', '1'));

      expect(result.reviews).toEqual(fakeReviews);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should update film favorite status when film id matches', () => {
      const film = makeFakeFilm();
      const initialState = {
        film,
        similarFilms: [],
        reviews: [],
        isFilmLoading: false,
      };
      const updatedFilm = { ...film, isFavorite: true };
      const result = filmData(
        initialState,
        toggleFavoriteAction.fulfilled(updatedFilm, '', { id: film.id, status: 1 })
      );

      expect(result.film?.isFavorite).toBe(true);
    });

    it('should not update film when id does not match', () => {
      const film = makeFakeFilm();
      const initialState = {
        film,
        similarFilms: [],
        reviews: [],
        isFilmLoading: false,
      };
      const differentFilm = { ...makeFakeFilm(), id: 999, isFavorite: true };
      const result = filmData(
        initialState,
        toggleFavoriteAction.fulfilled(differentFilm, '', { id: 999, status: 1 })
      );

      expect(result.film).toEqual(film);
    });

    it('should handle when film is null', () => {
      const initialState = {
        film: null,
        similarFilms: [],
        reviews: [],
        isFilmLoading: false,
      };
      const updatedFilm = makeFakeFilm();
      const result = filmData(
        initialState,
        toggleFavoriteAction.fulfilled(updatedFilm, '', { id: 1, status: 1 })
      );

      expect(result.film).toBeNull();
    });
  });
});
