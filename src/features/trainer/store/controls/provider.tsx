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

const ControlsContext = createContext<State | null>(null);
const ControlsDispatchContext = createContext<ActionDispatch<
  [action: Action]
> | null>(null);

interface Props {
  children: ReactNode;
}

export function ControlsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ControlsContext value={state}>
      <ControlsDispatchContext value={dispatch}>
        {children}
      </ControlsDispatchContext>
    </ControlsContext>
  );
}

export function useControlsState(): [
  state: State,
  dispatch: ActionDispatch<[action: Action]>
] {
  const state = useContext(ControlsContext);
  const dispatch = useContext(ControlsDispatchContext);

  assertState(state);
  assertDispatch(dispatch);

  return [state, dispatch];
}

function assertState(state: State | null): asserts state {
  if (!state) throw new Error('Controls state is not available!');
}

function assertDispatch(
  dispatch: ActionDispatch<[action: Action]> | null
): asserts dispatch {
  if (!dispatch) throw new Error('Controls dispatch is not available!');
}
