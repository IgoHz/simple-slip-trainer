import { RATE_COUNTER_MIN_VALUE } from '@/features/trainer/config/rate';
import { Action, ActionType } from './actions';

export interface State {
  rate: number;
  isPlaying: boolean;
}

export const initialState: State = {
  rate: RATE_COUNTER_MIN_VALUE,
  isPlaying: false
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.SET_RATE: {
      return {
        ...state,
        rate: action.payload.rate
      };
    }
    case ActionType.SET_IS_PLAYING: {
      return {
        ...state,
        isPlaying: action.payload.isPlaying
      };
    }
    default:
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
  }
}
