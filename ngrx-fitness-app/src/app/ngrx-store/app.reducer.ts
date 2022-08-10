
export interface State {
  isLoading: boolean
}

//  start with initial state
const initialState: State = {
  isLoading: false
};

//  implement default state (when nothing has been set yet)
export function AppReducer(state = initialState, action: any) {
  //  action must have type property of string
  switch (action.type) {
    case APP_LOADING_STATE.START_LOADING:
      return {
        isLoading: true
      };
    case APP_LOADING_STATE.STOP_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
  return state;
}

export const APP_LOADING_STATE = {
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
}
