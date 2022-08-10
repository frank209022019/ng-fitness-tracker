import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';

export interface State {
  ui: fromUi.State;
}

//  Group reducers
export const REDUCERS: ActionReducerMap<State> = {
  //  Loader state
  ui: fromUi.uiReducer
}

//  Access a reducer by string
export const GET_UI_STATE = createFeatureSelector<fromUi.State>('ui');
//  Get loader state => () : pass a param to trigger the avove GET_UI_STATE
export const GET_IS_LOADING = createSelector(GET_UI_STATE, fromUi.GET_IS_LOADING);
