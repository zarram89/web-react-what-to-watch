import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import GenreList from './GenreList';
import { NameSpace } from '../../const/name-space';
import { makeFakeFilms } from '../../utils/test-utils';

const mockStore = configureMockStore();

describe('GenreList component', () => {
  it('should render genre list correctly', () => {
    const fakeFilms = makeFakeFilms(5);
    const store = mockStore({
      [NameSpace.Data]: {
        films: fakeFilms,
      },
      [NameSpace.App]: {
        genre: 'All genres',
      },
    });

    render(
      <Provider store={store}>
        <GenreList films={fakeFilms} currentGenre="All genres" />
      </Provider>
    );

    expect(screen.getByText('All genres')).toBeInTheDocument();
  });

  it('should dispatch changeGenre action on genre click', () => {
    const fakeFilms = [
      { ...makeFakeFilms(1)[0], genre: 'Drama' },
      { ...makeFakeFilms(1)[0], id: 2, genre: 'Comedy' },
    ];

    const store = mockStore({
      [NameSpace.Data]: {
        films: fakeFilms,
      },
      [NameSpace.App]: {
        genre: 'All genres',
      },
    });

    render(
      <Provider store={store}>
        <GenreList films={fakeFilms} currentGenre="All genres" />
      </Provider>
    );

    const dramaButton = screen.getByText('Drama');
    fireEvent.click(dramaButton);

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('films/changeGenre');
    expect(actions[0].payload).toBe('Drama');
  });
});
