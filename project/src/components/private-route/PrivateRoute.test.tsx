import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthorizationStatus, AppRoute } from '../../const';
import { NameSpace } from '../../const/name-space';

const mockStore = configureMockStore();

describe('PrivateRoute component', () => {
  it('should render Spinner when authorization status is Unknown', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>
            <div>Private content</div>
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });

  it('should render children when user is authenticated', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>
            <div>Private content</div>
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Private content')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.MyList]}>
          <Routes>
            <Route
              path={AppRoute.MyList}
              element={
                <PrivateRoute>
                  <div>Private content</div>
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.SignIn} element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });
});
