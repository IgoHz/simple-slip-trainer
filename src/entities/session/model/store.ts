import { create } from 'zustand';
import { RATE_COUNTER_MIN_VALUE } from '../config/rate';
import { devtools, persist } from 'zustand/middleware';
import { SessionState, TrainingMode } from './types';

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        rate: RATE_COUNTER_MIN_VALUE,
        isPlaying: false,
        mode: TrainingMode.RANDOM_SINGLES,
        resetCount: 0,
        setRate: (rate: number) =>
          set({ rate }, undefined, 'controls/set-rate'),
        setIsPlaying: (isPlaying: boolean) =>
          set({ isPlaying }, undefined, 'controls/set-is-playing'),
        setMode: (mode: TrainingMode) =>
          set({ mode }, undefined, 'controls/set-mode'),
        resetSession: () =>
          set(
            (state) => ({ resetCount: state.resetCount + 1, isPlaying: false }),
            undefined,
            'controls/reset-session'
          )
      }),
      {
        name: 'controls',
        partialize: (state) => ({
          rate: state.rate,
          mode: state.mode
        })
      }
    )
  )
);

// Backward compatibility alias
export const useControlsStore = useSessionStore;

export default useSessionStore;
