import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import App from './app';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../const/name-space';
import { makeFakeFilms } from '../../utils/test-utils';
import { createAPI } from '../../services/api';

const api = createAPI();
const middlewares = [thunk.withExtraArgument({ api })];
const mockStore = configureMockStore(middlewares);

describe('App component', () => {
  const fakeFilms = makeFakeFilms(3);

  const createMockState = (authStatus: AuthorizationStatus) => ({
    [NameSpace.App]: {
      genre: 'All genres',
    },
    [NameSpace.User]: {
      authorizationStatus: authStatus,
      user: null,
    },
    [NameSpace.Data]: {
      films: fakeFilms,
      favoriteFilms: [],
      isLoading: false,
      hasError: false,
    },
    [NameSpace.Film]: {
      film: null,
      similarFilms: [],
      reviews: [],
      isFilmLoading: false,
    },
  });

  it('should render MainScreen for root route', () => {
    const store = mockStore(createMockState(AuthorizationStatus.Auth));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App
            promoFilmTitle="Test Film"
            promoFilmGenre="Drama"
            promoFilmYear={2020}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
  });

  it('should render loading spinner when films are loading', () => {
    const store = mockStore({
      ...createMockState(AuthorizationStatus.Auth),
      [NameSpace.Data]: {
        films: [],
        favoriteFilms: [],
        isLoading: true,
        hasError: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App
            promoFilmTitle="Test Film"
            promoFilmGenre="Drama"
            promoFilmYear={2020}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render SignInScreen for /login route', () => {
    const store = mockStore(createMockState(AuthorizationStatus.NoAuth));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <App
            promoFilmTitle="Test Film"
            promoFilmGenre="Drama"
            promoFilmYear={2020}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
  });

  it('should redirect to login when accessing MyList without auth', () => {
    const store = mockStore(createMockState(AuthorizationStatus.NoAuth));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/mylist']}>
          <App
            promoFilmTitle="Test Film"
            promoFilmGenre="Drama"
            promoFilmYear={2020}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
  });

  it('should render MyListScreen for authenticated user on /mylist route', () => {
    const store = mockStore(createMockState(AuthorizationStatus.Auth));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/mylist']}>
          <App
            promoFilmTitle="Test Film"
            promoFilmGenre="Drama"
            promoFilmYear={2020}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render NotFoundScreen for unknown route', () => {
    const store = mockStore(createMockState(AuthorizationStatus.Auth));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App
            promoFilmTitle="Test Film"
            promoFilmGenre="Drama"
            promoFilmYear={2020}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
