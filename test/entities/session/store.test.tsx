import { useSessionStore, TrainingMode } from '@/entities/session';
import { act } from 'react';

describe('session store', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { setRate, setIsPlaying, setMode } = useSessionStore.getState();
    setRate(0);
    setIsPlaying(false);
    setMode(TrainingMode.RANDOM_SINGLES);
  });

  it('should have initial state', () => {
    const state = useSessionStore.getState();
    expect(state.rate).toBe(0);
    expect(state.isPlaying).toBe(false);
    expect(state.mode).toBe(TrainingMode.RANDOM_SINGLES);
    expect(state.resetCount).toBe(0);
  });

  it('should set rate', () => {
    act(() => {
      useSessionStore.getState().setRate(5);
    });
    expect(useSessionStore.getState().rate).toBe(5);
  });

  it('should set isPlaying', () => {
    act(() => {
      useSessionStore.getState().setIsPlaying(true);
    });
    expect(useSessionStore.getState().isPlaying).toBe(true);
  });

  it('should set mode', () => {
    act(() => {
      useSessionStore.getState().setMode(TrainingMode.COMBINATIONS);
    });
    expect(useSessionStore.getState().mode).toBe(TrainingMode.COMBINATIONS);
  });

  it('should reset session and increment resetCount', () => {
    act(() => {
      useSessionStore.getState().setIsPlaying(true);
      useSessionStore.getState().resetSession();
    });
    expect(useSessionStore.getState().isPlaying).toBe(false);
    expect(useSessionStore.getState().resetCount).toBe(1);
  });
});
