import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';
import { SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_ACTIVE_TRAINING, STOP_ACTIVE_TRAINING, TrainingActions } from './training.actions';
import * as fromRoot from '../app.reducer';
import { AuthActions } from '../auth/auth.actions';

//  Extends app.reducer
export interface TrainingState {
  availableExercises: Exercise[],
  finsihedExercises: Exercise[],
  activeTraining: Exercise
}

//  Lazy-loaded - get properties registered
export interface State extends fromRoot.State {
  training: TrainingState
}

const initialState: TrainingState = {
  availableExercises: [],
  finsihedExercises: [],
  activeTraining: null,

};

export function TrainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finsihedExercises: action.payload
      };
    case START_ACTIVE_TRAINING:
      return {
        ...state,
        activeTraining: action.payload
      };
    case STOP_ACTIVE_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default: {
      return state;
    }
  }
}

export const GET_AVAILABLE_TRAINING = (state: TrainingState) => state.availableExercises;
export const GET_FINISHED_TRAININGS = (state: TrainingState) => state.finsihedExercises;
export const GET_ACTIVE_TRAINING = (state: TrainingState) => state.activeTraining;
