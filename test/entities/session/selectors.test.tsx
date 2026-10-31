import {
  useSessionStore,
  rateSelector,
  isPlayingSelector,
  modeSelector,
  resetCountSelector,
  setRateSelector,
  setIsPlayingSelector,
  setModeSelector,
  resetSessionSelector
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

  it('modeSelector should return mode', () => {
    const state = useSessionStore.getState();
    expect(modeSelector(state)).toBe(state.mode);
  });

  it('resetCountSelector should return resetCount', () => {
    const state = useSessionStore.getState();
    expect(resetCountSelector(state)).toBe(state.resetCount);
  });

  it('setRateSelector should return setRate function', () => {
    const state = useSessionStore.getState();
    expect(setRateSelector(state)).toBe(state.setRate);
  });

  it('setIsPlayingSelector should return setIsPlaying function', () => {
    const state = useSessionStore.getState();
    expect(setIsPlayingSelector(state)).toBe(state.setIsPlaying);
  });

  it('setModeSelector should return setMode function', () => {
    const state = useSessionStore.getState();
    expect(setModeSelector(state)).toBe(state.setMode);
  });

  it('resetSessionSelector should return resetSession function', () => {
    const state = useSessionStore.getState();
    expect(resetSessionSelector(state)).toBe(state.resetSession);
  });
});
