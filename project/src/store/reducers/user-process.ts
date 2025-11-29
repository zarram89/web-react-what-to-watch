import { createReducer } from '@reduxjs/toolkit';
import { checkAuthAction, loginAction, logoutAction } from '../action';
import { User } from '../../types/user';
import { AuthorizationStatus } from '../../const';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    });
});
