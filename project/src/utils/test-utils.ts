import { Film } from '../types/film';
import { User } from '../types/user';
import { Review } from '../types/review';

export const makeFakeFilm = (): Film => ({
  id: 1,
  name: 'Test Film',
  posterImage: 'poster.jpg',
  previewImage: 'preview.jpg',
  backgroundImage: 'background.jpg',
  backgroundColor: '#000000',
  videoLink: 'video.mp4',
  previewVideoLink: 'preview.mp4',
  description: 'Test description',
  rating: 8.5,
  scoresCount: 100,
  director: 'Test Director',
  starring: ['Actor 1', 'Actor 2'],
  runTime: 120,
  genre: 'Drama',
  released: 2020,
  isFavorite: false,
});

export const makeFakeFilms = (count = 3): Film[] =>
  Array.from({ length: count }, (_, index) => ({
    ...makeFakeFilm(),
    id: index + 1,
    name: `Test Film ${index + 1}`,
  }));

export const makeFakeUser = (): User => ({
  name: 'Test User',
  avatarUrl: 'avatar.jpg',
  email: 'test@test.com',
  token: 'test-token',
});

export const makeFakeReview = (): Review => ({
  id: 1,
  user: {
    id: 1,
    name: 'Test User',
  },
  rating: 8,
  comment: 'Test review comment',
  date: '2023-01-01T00:00:00.000Z',
});

export const makeFakeReviews = (count = 3): Review[] =>
  Array.from({ length: count }, (_, index) => ({
    ...makeFakeReview(),
    id: index + 1,
    comment: `Test review comment ${index + 1}`,
  }));
