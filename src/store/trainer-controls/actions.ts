import { State } from './reducer';

type GenericAction<Type, StateKey extends keyof State> = {
  type: Type;
  payload: Pick<State, StateKey>;
};

export enum ActionType {
  SET_RATE = 'set-rate',
  SET_IS_PLAYING = 'set-is-playing'
}

export type Action = GenericAction<ActionType.SET_RATE, 'rate'> | GenericAction<ActionType.SET_IS_PLAYING, 'isPlaying'>;

export function setRate(rate: State['rate']): Action {
  return {
    type: ActionType.SET_RATE,
    payload: {
      rate
    }
  };
}

export function setIsPlaying(isPlaying: State['isPlaying']): Action {
  return {
    type: ActionType.SET_IS_PLAYING,
    payload: {
      isPlaying
    }
  };
}
