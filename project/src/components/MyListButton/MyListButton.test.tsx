import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import MyListButton from './MyListButton';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../const/name-space';

const mockStore = configureMockStore();

describe('MyListButton component', () => {
  it('should render correctly when film is not favorite', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MyListButton filmId={1} isFavorite={false} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render with count when provided', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MyListButton filmId={1} isFavorite={false} count={5} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render correctly when film is favorite', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MyListButton filmId={1} isFavorite />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
