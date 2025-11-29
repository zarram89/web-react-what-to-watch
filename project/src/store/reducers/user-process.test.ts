import { userProcess } from './user-process';
import { checkAuthAction, loginAction, logoutAction } from '../action';
import { AuthorizationStatus } from '../../const';
import { makeFakeUser } from '../../utils/test-utils';

describe('userProcess reducer', () => {
  it('should return initial state when called with undefined state', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
    const result = userProcess(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual(expectedState);
  });

  describe('checkAuthAction', () => {
    it('should set Auth status and user on fulfilled', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      };
      const fakeUser = makeFakeUser();
      const result = userProcess(initialState, checkAuthAction.fulfilled(fakeUser, '', undefined));

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.user).toEqual(fakeUser);
    });

    it('should set NoAuth status on rejected', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      };
      const result = userProcess(initialState, checkAuthAction.rejected(null, '', undefined));

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.user).toBeNull();
    });
  });

  describe('loginAction', () => {
    it('should set Auth status and user on fulfilled', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      };
      const fakeUser = makeFakeUser();
      const result = userProcess(
        initialState,
        loginAction.fulfilled(fakeUser, '', { email: 'test@test.com', password: 'password' })
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.user).toEqual(fakeUser);
    });

    it('should set NoAuth status on rejected', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      };
      const result = userProcess(
        initialState,
        loginAction.rejected(null, '', { email: 'test@test.com', password: 'password' })
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });
  });

  describe('logoutAction', () => {
    it('should reset auth status and user on fulfilled', () => {
      const fakeUser = makeFakeUser();
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
      };
      const result = userProcess(initialState, logoutAction.fulfilled(undefined, '', undefined));

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.user).toBeNull();
    });
  });
});
