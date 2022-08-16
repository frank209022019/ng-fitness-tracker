import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Training';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Training';
export const START_ACTIVE_TRAINING = '[Training] Start Active Traininig';
export const STOP_ACTIVE_TRAINING = '[Training] Stop Active Training';

export class SetAvailableTraining implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;
  constructor(public payload: Exercise[]) { }
}

export class SetFinishedTraining implements Action {
  readonly type = SET_FINISHED_TRAININGS;
  constructor(public payload: Exercise[]) { }
}

export class StartTraining implements Action {
  readonly type = START_ACTIVE_TRAINING;
  constructor(public payload: Exercise) { }
}

export class StopTraining implements Action {
  readonly type = STOP_ACTIVE_TRAINING;
}



export type TrainingActions = SetAvailableTraining | SetFinishedTraining | StartTraining | StopTraining;
