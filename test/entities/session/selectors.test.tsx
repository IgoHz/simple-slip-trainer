import {
  useSessionStore,
  rateSelector,
  isPlayingSelector,
  setRateSelector,
  setIsPlayingSelector
} from '@/entities/session';

describe('session selectors', () => {
  it('rateSelector should return rate', () => {
    const state = useSessionStore.getState();
    expect(rateSelector(state)).toBe(state.rate);
  });

  it('isPlayingSelector should return isPlaying', () => {
    const state = useSessionStore.getState();
    expect(isPlayingSelector(state)).toBe(state.isPlaying);
  });

  it('setRateSelector should return setRate function', () => {
    const state = useSessionStore.getState();
    expect(setRateSelector(state)).toBe(state.setRate);
  });

  it('setIsPlayingSelector should return setIsPlaying function', () => {
    const state = useSessionStore.getState();
    expect(setIsPlayingSelector(state)).toBe(state.setIsPlaying);
  });
});
