import { filmsData } from './films-data';
import { fetchFilmsAction, fetchFavoriteFilmsAction, toggleFavoriteAction } from '../action';
import { makeFakeFilm, makeFakeFilms } from '../../utils/test-utils';

describe('filmsData reducer', () => {
  it('should return initial state when called with undefined state', () => {
    const expectedState = {
      films: [],
      favoriteFilms: [],
      isLoading: false,
      hasError: false,
    };
    const result = filmsData(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual(expectedState);
  });

  describe('fetchFilmsAction', () => {
    it('should set isLoading to true on pending', () => {
      const initialState = {
        films: [],
        favoriteFilms: [],
        isLoading: false,
        hasError: false,
      };
      const result = filmsData(initialState, fetchFilmsAction.pending('', undefined));

      expect(result.isLoading).toBe(true);
      expect(result.hasError).toBe(false);
    });

    it('should load films and set isLoading to false on fulfilled', () => {
      const initialState = {
        films: [],
        favoriteFilms: [],
        isLoading: true,
        hasError: false,
      };
      const fakeFilms = makeFakeFilms(3);
      const result = filmsData(initialState, fetchFilmsAction.fulfilled(fakeFilms, '', undefined));

      expect(result.films).toEqual(fakeFilms);
      expect(result.isLoading).toBe(false);
      expect(result.hasError).toBe(false);
    });

    it('should set hasError to true and isLoading to false on rejected', () => {
      const initialState = {
        films: [],
        favoriteFilms: [],
        isLoading: true,
        hasError: false,
      };
      const result = filmsData(initialState, fetchFilmsAction.rejected(null, '', undefined));

      expect(result.isLoading).toBe(false);
      expect(result.hasError).toBe(true);
    });
  });

  describe('fetchFavoriteFilmsAction', () => {
    it('should load favorite films on fulfilled', () => {
      const initialState = {
        films: [],
        favoriteFilms: [],
        isLoading: false,
        hasError: false,
      };
      const fakeFilms = makeFakeFilms(2);
      const result = filmsData(initialState, fetchFavoriteFilmsAction.fulfilled(fakeFilms, '', undefined));

      expect(result.favoriteFilms).toEqual(fakeFilms);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should update film in films array and add to favoriteFilms when toggled to favorite', () => {
      const film = makeFakeFilm();
      const initialState = {
        films: [film],
        favoriteFilms: [],
        isLoading: false,
        hasError: false,
      };
      const updatedFilm = { ...film, isFavorite: true };
      const result = filmsData(
        initialState,
        toggleFavoriteAction.fulfilled(updatedFilm, '', { id: film.id, status: 1 })
      );

      expect(result.films[0].isFavorite).toBe(true);
      expect(result.favoriteFilms).toHaveLength(1);
      expect(result.favoriteFilms[0]).toEqual(updatedFilm);
    });

    it('should update film in films array and remove from favoriteFilms when toggled to not favorite', () => {
      const film = { ...makeFakeFilm(), isFavorite: true };
      const initialState = {
        films: [film],
        favoriteFilms: [film],
        isLoading: false,
        hasError: false,
      };
      const updatedFilm = { ...film, isFavorite: false };
      const result = filmsData(
        initialState,
        toggleFavoriteAction.fulfilled(updatedFilm, '', { id: film.id, status: 0 })
      );

      expect(result.films[0].isFavorite).toBe(false);
      expect(result.favoriteFilms).toHaveLength(0);
    });

    it('should not add duplicate to favoriteFilms if already exists', () => {
      const film = { ...makeFakeFilm(), isFavorite: true };
      const initialState = {
        films: [film],
        favoriteFilms: [film],
        isLoading: false,
        hasError: false,
      };
      const result = filmsData(
        initialState,
        toggleFavoriteAction.fulfilled(film, '', { id: film.id, status: 1 })
      );

      expect(result.favoriteFilms).toHaveLength(1);
    });
  });
});
