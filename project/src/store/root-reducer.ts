import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/name-space';
import { appProcess } from './reducers/app-process';
import { userProcess } from './reducers/user-process';
import { filmsData } from './reducers/films-data';
import { filmData } from './reducers/film-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess,
  [NameSpace.User]: userProcess,
  [NameSpace.Data]: filmsData,
  [NameSpace.Film]: filmData,
});
