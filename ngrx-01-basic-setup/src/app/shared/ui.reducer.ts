import { UIActions, UI_ACTIONS, } from "./ui.actions";

//  Exported to be used across the system
export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state = initialState, action: UIActions){
  switch (action.type) {
    case UI_ACTIONS.START_LOADING:
      return {
        isLoading: true
      };
    case UI_ACTIONS. STOP_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}

export const GET_IS_LOADING = (state: State) => state.isLoading;
