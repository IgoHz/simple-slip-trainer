import useControlsStore from '../../../../../src/features/trainer/store/controls/store';
import {
  rateSelector,
  isPlayingSelector,
  setRateSelector,
  setIsPlayingSelector
} from '../../../../../src/features/trainer/store/controls/selectors';

describe('controls selectors', () => {
  it('rateSelector should return rate', () => {
    const state = useControlsStore.getState();
    expect(rateSelector(state)).toBe(state.rate);
  });

  it('isPlayingSelector should return isPlaying', () => {
    const state = useControlsStore.getState();
    expect(isPlayingSelector(state)).toBe(state.isPlaying);
  });

  it('setRateSelector should return setRate function', () => {
    const state = useControlsStore.getState();
    expect(setRateSelector(state)).toBe(state.setRate);
  });

  it('setIsPlayingSelector should return setIsPlaying function', () => {
    const state = useControlsStore.getState();
    expect(setIsPlayingSelector(state)).toBe(state.setIsPlaying);
  });
});
