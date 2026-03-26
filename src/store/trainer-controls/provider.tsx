'use client';

import {
  ActionDispatch,
  createContext,
  useContext,
  useReducer,
  ReactNode
} from 'react';
import { initialState, reducer, State } from './reducer';
import { Action } from './actions';

const TrainerControlsContext = createContext<State | null>(null);
const TrainerControlsDispatchContext = createContext<ActionDispatch<
  [action: Action]
> | null>(null);

interface Props {
  children: ReactNode;
}

export function TrainerControlsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TrainerControlsContext value={state}>
      <TrainerControlsDispatchContext value={dispatch}>
        {children}
      </TrainerControlsDispatchContext>
    </TrainerControlsContext>
  );
}

export function useTrainerControlsState(): [
  state: State,
  dispatch: ActionDispatch<[action: Action]>
] {
  const state = useContext(TrainerControlsContext);
  const dispatch = useContext(TrainerControlsDispatchContext);

  assertState(state);
  assertDispatch(dispatch);

  return [state, dispatch];
}

function assertState(state: State | null): asserts state {
  if (!state) throw new Error('Trainer controls state is not available!');
}

function assertDispatch(
  dispatch: ActionDispatch<[action: Action]> | null
): asserts dispatch {
  if (!dispatch) throw new Error('Trainer controls dispatch is not available!');
}
