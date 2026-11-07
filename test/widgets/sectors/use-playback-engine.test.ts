import { act, renderHook } from '@testing-library/react';
import { usePlaybackEngine } from '@/widgets/sectors/lib/use-playback-engine';
import { TrainingMode } from '@/entities/session';
import { PunchCombination } from '@/entities/combination';
import {
  PunchType,
  SectorPosition,
  sectorPositionsConfig
} from '@/entities/sector';
import { vi } from 'vitest';

describe('usePlaybackEngine', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const testCombo: PunchCombination = {
    id: 'test-1-2',
    name: 'Test 1-2',
    punches: [PunchType.LEFT_STRAIGHT, PunchType.RIGHT_STRAIGHT],
    intervalMs: 600
  };

  it('starts inactive when isPlaying is false', () => {
    const { result } = renderHook(() =>
      usePlaybackEngine({
        isPlaying: false,
        rate: 60,
        mode: TrainingMode.COMBINATIONS,
        combinations: [testCombo]
      })
    );

    expect(result.current.activeSectorIndex).toBeNull();
    expect(result.current.animationDuration).toBeUndefined();
    expect(result.current.currentSequence).toBeNull();
  });

  it('starts executing punches when isPlaying becomes true', () => {
    const { result, rerender } = renderHook(
      ({ isPlaying }) =>
        usePlaybackEngine({
          isPlaying,
          rate: 60,
          mode: TrainingMode.COMBINATIONS,
          combinations: [testCombo]
        }),
      { initialProps: { isPlaying: false } }
    );

    rerender({ isPlaying: true });

    // Step 0: punch 1 active
    expect(result.current.activeSectorIndex).not.toBeNull();
    expect(result.current.animationDuration).toBe('0.3s'); // 600 / 2 / 1000
    expect(result.current.currentSequence?.id).toContain('test-1-2');
  });

  it('progresses through combination punch steps and trailing rest', () => {
    const { result } = renderHook(() =>
      usePlaybackEngine({
        isPlaying: true,
        rate: 60, // 2000ms rest cadence
        mode: TrainingMode.COMBINATIONS,
        combinations: [testCombo]
      })
    );

    const firstSector = result.current.activeSectorIndex;
    expect(firstSector).not.toBeNull();
    expect(result.current.animationDuration).toBe('0.3s');

    // Advance 600ms to punch 2
    act(() => {
      vi.advanceTimersByTime(600);
    });

    const secondSector = result.current.activeSectorIndex;
    expect(secondSector).not.toBeNull();
    expect(result.current.animationDuration).toBe('0.3s');

    // Advance 600ms to rest step
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // During rest step, activeSectorIndex is null
    expect(result.current.activeSectorIndex).toBeNull();
    expect(result.current.animationDuration).toBeUndefined();

    // Advance 2000ms through rest period to next sequence
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Next sequence starts
    expect(result.current.activeSectorIndex).not.toBeNull();
  });

  it('preserves current sequence position and remaining timing on pause and resume', () => {
    const { result, rerender } = renderHook(
      ({ isPlaying }) =>
        usePlaybackEngine({
          isPlaying,
          rate: 60,
          mode: TrainingMode.COMBINATIONS,
          combinations: [testCombo]
        }),
      { initialProps: { isPlaying: true } }
    );

    const firstSector = result.current.activeSectorIndex;
    expect(firstSector).not.toBeNull();

    // 200ms into the first 600ms punch
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Pause
    rerender({ isPlaying: false });
    expect(result.current.activeSectorIndex).toBeNull();

    // Advancing timers while paused should do nothing
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.activeSectorIndex).toBeNull();

    // Resume
    rerender({ isPlaying: true });
    expect(result.current.activeSectorIndex).toBe(firstSector);

    // Remaining time in punch 1 was 400ms (600 - 200).
    // Advancing 390ms should still be in punch 1:
    act(() => {
      vi.advanceTimersByTime(390);
    });
    expect(result.current.activeSectorIndex).toBe(firstSector);

    // Advancing another 20ms should complete punch 1 and transition to punch 2
    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(result.current.activeSectorIndex).not.toBeNull();
  });

  it('cancels pending playback and clears sequence state on reset', () => {
    const { result, rerender } = renderHook(
      ({ resetCount }) =>
        usePlaybackEngine({
          isPlaying: true,
          rate: 60,
          mode: TrainingMode.COMBINATIONS,
          resetCount,
          combinations: [testCombo]
        }),
      { initialProps: { resetCount: 0 } }
    );

    expect(result.current.activeSectorIndex).not.toBeNull();

    // Trigger reset
    rerender({ resetCount: 1 });
    expect(result.current.activeSectorIndex).toBeNull();
    expect(result.current.currentSequence).toBeNull();
  });

  it('safely cancels active sequence and starts new sequence on mode change', () => {
    const { result, rerender } = renderHook(
      ({ mode }) =>
        usePlaybackEngine({
          isPlaying: true,
          rate: 60,
          mode,
          combinations: [testCombo]
        }),
      { initialProps: { mode: TrainingMode.COMBINATIONS } }
    );

    expect(result.current.currentSequence?.type).toBe('combination');

    // Switch mode to RANDOM_SINGLES
    rerender({ mode: TrainingMode.RANDOM_SINGLES });

    expect(result.current.currentSequence?.type).toBe('single');
    expect(result.current.activeSectorIndex).not.toBeNull();
  });

  it('does not create duplicate scheduling loops when rate changes during playback', () => {
    const { result, rerender } = renderHook(
      ({ rate }) =>
        usePlaybackEngine({
          isPlaying: true,
          rate,
          mode: TrainingMode.COMBINATIONS,
          combinations: [testCombo]
        }),
      { initialProps: { rate: 60 } }
    );

    expect(result.current.activeSectorIndex).not.toBeNull();

    // Change rate mid-playback
    rerender({ rate: 120 });

    // Punch 1 still finishes after remaining time
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(result.current.activeSectorIndex).not.toBeNull();
  });

  it('cleans up timers on component unmount', () => {
    const { unmount } = renderHook(() =>
      usePlaybackEngine({
        isPlaying: true,
        rate: 60,
        mode: TrainingMode.COMBINATIONS,
        combinations: [testCombo]
      })
    );

    expect(vi.getTimerCount()).toBe(1);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });

  it('handles rapid pause and resume interactions correctly', () => {
    const { result, rerender } = renderHook(
      ({ isPlaying }) =>
        usePlaybackEngine({
          isPlaying,
          rate: 60,
          mode: TrainingMode.COMBINATIONS,
          combinations: [testCombo]
        }),
      { initialProps: { isPlaying: true } }
    );

    const initialSector = result.current.activeSectorIndex;
    expect(initialSector).not.toBeNull();

    // Advance slightly
    act(() => {
      vi.advanceTimersByTime(50);
    });

    // Rapid pause-resume cycles
    rerender({ isPlaying: false });
    expect(result.current.activeSectorIndex).toBeNull();

    rerender({ isPlaying: true });
    expect(result.current.activeSectorIndex).toBe(initialSector);

    rerender({ isPlaying: false });
    expect(result.current.activeSectorIndex).toBeNull();

    rerender({ isPlaying: true });
    expect(result.current.activeSectorIndex).toBe(initialSector);

    // Advance remaining time (~550ms)
    act(() => {
      vi.advanceTimersByTime(560);
    });

    // Should transition to step 2
    expect(result.current.activeSectorIndex).not.toBeNull();
  });

  it('starts a fresh sequence after reset when playback resumes', () => {
    const { result, rerender } = renderHook(
      ({ isPlaying, resetCount }) =>
        usePlaybackEngine({
          isPlaying,
          rate: 60,
          mode: TrainingMode.COMBINATIONS,
          resetCount,
          combinations: [testCombo]
        }),
      { initialProps: { isPlaying: true, resetCount: 0 } }
    );

    expect(result.current.activeSectorIndex).not.toBeNull();

    // Reset while paused (like real app Stop button click)
    rerender({ isPlaying: false, resetCount: 1 });
    expect(result.current.activeSectorIndex).toBeNull();
    expect(result.current.currentSequence).toBeNull();

    // Resume playback after reset
    rerender({ isPlaying: true, resetCount: 1 });
    expect(result.current.activeSectorIndex).not.toBeNull();
    expect(result.current.currentSequence?.id).toContain('test-1-2');
  });

  it('aligns combination punch duration and animation speed to rateCadence when no intervalMs override is present', () => {
    const rateCombo: PunchCombination = {
      id: 'rate-1-2',
      name: 'Rate 1-2',
      punches: [PunchType.LEFT_STRAIGHT, PunchType.RIGHT_STRAIGHT]
    };

    const { result } = renderHook(() =>
      usePlaybackEngine({
        isPlaying: true,
        rate: 60, // 2000ms cadence
        mode: TrainingMode.COMBINATIONS,
        combinations: [rateCombo]
      })
    );

    // At rate 60: duration is 2000ms, animation duration is 1s (2000 / 2 / 1000)
    expect(result.current.activeSectorIndex).not.toBeNull();
    expect(result.current.animationDuration).toBe('1s');

    // Advance 2000ms to punch 2
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.activeSectorIndex).not.toBeNull();
    expect(result.current.animationDuration).toBe('1s');
  });

  it('plays combination punches at their exact direct sector positions', () => {
    const directCombo: PunchCombination = {
      id: 'direct-head-body',
      name: 'Direct Head Body',
      punches: [
        SectorPosition.UPPER_LEFT_STRAIGHT,
        SectorPosition.UPPER_RIGHT_STRAIGHT,
        SectorPosition.RIGHT_LOWER
      ],
      intervalMs: 500
    };

    const { result } = renderHook(() =>
      usePlaybackEngine({
        isPlaying: true,
        rate: 60,
        mode: TrainingMode.COMBINATIONS,
        combinations: [directCombo]
      })
    );

    // Punch 1: UPPER_LEFT_STRAIGHT
    expect(result.current.activeSectorIndex).toBe(
      sectorPositionsConfig.indexOf(SectorPosition.UPPER_LEFT_STRAIGHT)
    );

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Punch 2: UPPER_RIGHT_STRAIGHT
    expect(result.current.activeSectorIndex).toBe(
      sectorPositionsConfig.indexOf(SectorPosition.UPPER_RIGHT_STRAIGHT)
    );

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Punch 3: RIGHT_LOWER
    expect(result.current.activeSectorIndex).toBe(
      sectorPositionsConfig.indexOf(SectorPosition.RIGHT_LOWER)
    );
  });

  it('inserts a rest delay after a single punch when followed by a combination in MIXED mode', () => {
    // We mock Math.random:
    // Call 1: in selectSequence (randomFn < mixedProbability) -> return 0.8 (selects SINGLE)
    // Call 2: in selectSequence (randomFn < mixedProbability) -> return 0.2 (selects COMBO)
    let callCount = 0;
    const mockRandom = vi.spyOn(Math, 'random').mockImplementation(() => {
      callCount++;
      return callCount === 1 ? 0.8 : 0.2;
    });

    const { result } = renderHook(() =>
      usePlaybackEngine({
        isPlaying: true,
        rate: 60, // 2000ms cadence
        mode: TrainingMode.MIXED,
        mixedProbability: 0.5,
        combinations: [testCombo]
      })
    );

    // Initial sequence is a single punch: punch is active immediately
    expect(result.current.currentSequence?.type).toBe('single');
    expect(result.current.activeSectorIndex).not.toBeNull();

    // Advance 2000ms: single punch finishes, transitions to combination
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Since single was followed by combo, Step 0 of combo is a rest delay!
    expect(result.current.currentSequence?.type).toBe('combination');
    expect(result.current.activeSectorIndex).toBeNull();

    // Advance 2000ms through the rest delay
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Combo punch 1 is now active!
    expect(result.current.activeSectorIndex).not.toBeNull();

    mockRandom.mockRestore();
  });
});
