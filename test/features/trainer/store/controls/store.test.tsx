import useControlsStore from '../../../../../src/features/trainer/store/controls/store';
import { act } from 'react';

describe('controls store', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { setRate, setIsPlaying } = useControlsStore.getState();
    setRate(0);
    setIsPlaying(false);
  });

  it('should have initial state', () => {
    const state = useControlsStore.getState();
    expect(state.rate).toBe(0);
    expect(state.isPlaying).toBe(false);
  });

  it('should set rate', () => {
    act(() => {
      useControlsStore.getState().setRate(5);
    });
    expect(useControlsStore.getState().rate).toBe(5);
  });

  it('should set isPlaying', () => {
    act(() => {
      useControlsStore.getState().setIsPlaying(true);
    });
    expect(useControlsStore.getState().isPlaying).toBe(true);
  });
});
