import { create } from 'zustand';
import { RATE_COUNTER_MIN_VALUE } from '../config/rate';
import { devtools, persist } from 'zustand/middleware';
import { SessionState } from './types';

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        rate: RATE_COUNTER_MIN_VALUE,
        isPlaying: false,
        setRate: (rate: number) =>
          set({ rate }, undefined, 'controls/set-rate'),
        setIsPlaying: (isPlaying: boolean) =>
          set({ isPlaying }, undefined, 'controls/set-is-playing')
      }),
      {
        name: 'controls',
        partialize: (state) => ({
          rate: state.rate
        })
      }
    )
  )
);

// Backward compatibility alias
export const useControlsStore = useSessionStore;

export default useSessionStore;
