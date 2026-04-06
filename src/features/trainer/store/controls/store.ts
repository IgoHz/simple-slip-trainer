import { create } from 'zustand';
import { RATE_COUNTER_MIN_VALUE } from '../../config/rate';
import { devtools, persist } from 'zustand/middleware';

export interface State {
  rate: number;
  isPlaying: boolean;
  setRate: (rate: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const useControlsStore = create<State>()(
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

export default useControlsStore;
