import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

//  Group reducers
export const REDUCERS: ActionReducerMap<State> = {
  //  Loader state
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
}

//  Access a reducer by string
//  Get loader state => () : pass a param to trigger the avove GET_UI_STATE
export const GET_UI_STATE = createFeatureSelector<fromUi.State>('ui');
export const GET_IS_LOADING = createSelector(GET_UI_STATE, fromUi.GET_IS_LOADING);

export const GET_AUTH_STATE = createFeatureSelector<fromAuth.State>('auth');
export const GET_IS_AUTH = createSelector(GET_AUTH_STATE, fromAuth.GET_IS_AUTH);
