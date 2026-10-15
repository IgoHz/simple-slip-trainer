import { useSessionStore } from '@/entities/session';
import { act } from 'react';

describe('session store', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { setRate, setIsPlaying } = useSessionStore.getState();
    setRate(0);
    setIsPlaying(false);
  });

  it('should have initial state', () => {
    const state = useSessionStore.getState();
    expect(state.rate).toBe(0);
    expect(state.isPlaying).toBe(false);
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
});
