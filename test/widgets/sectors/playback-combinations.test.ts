import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PunchCombination } from '@/entities/combination';
import { PunchType } from '@/entities/sector';
import { TrainingMode } from '@/entities/session';
import { usePlaybackEngine } from '@/widgets/sectors/lib/use-playback-engine';

describe('Playback Engine Combination Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const comboA: PunchCombination = {
    id: 'combo-a',
    name: 'Combo A',
    punches: [PunchType.LEFT_STRAIGHT],
    intervalMs: 200
  };

  const comboB: PunchCombination = {
    id: 'combo-b',
    name: 'Combo B',
    punches: [PunchType.RIGHT_HOOK],
    intervalMs: 200
  };

  it('selects newly created combinations when collection updates', () => {
    const { result, rerender } = renderHook(
      ({ combinations }) =>
        usePlaybackEngine({
          isPlaying: true,
          rate: 60,
          mode: TrainingMode.COMBINATIONS,
          combinations
        }),
      {
        initialProps: { combinations: [comboA] }
      }
    );

    expect(result.current.currentSequence?.combinationId).toBe('combo-a');

    // Update collection to only have comboB
    rerender({ combinations: [comboB] });

    // Fast-forward past combo-a's steps (punch + rest delay)
    act(() => {
      vi.advanceTimersByTime(200);
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // The next sequence should now use comboB
    expect(result.current.currentSequence?.combinationId).toBe('combo-b');
  });

  it('degrades safely to single punch sequences when combination collection is empty', () => {
    const { result } = renderHook(() =>
      usePlaybackEngine({
        isPlaying: true,
        rate: 60,
        mode: TrainingMode.COMBINATIONS,
        combinations: []
      })
    );

    // Sequence type should safely fall back to single punch
    expect(result.current.currentSequence?.type).toBe('single');
    expect(result.current.activeSectorIndex).not.toBeNull();
  });

  it('mixed mode degrades safely to single punch sequences when combination collection is empty', () => {
    const { result } = renderHook(() =>
      usePlaybackEngine({
        isPlaying: true,
        rate: 60,
        mode: TrainingMode.MIXED,
        combinations: [],
        mixedProbability: 1.0 // Force combination branch
      })
    );

    expect(result.current.currentSequence?.type).toBe('single');
  });

  it('does not interrupt sequence in progress when combinations change', () => {
    const multiPunchCombo: PunchCombination = {
      id: 'multi-punch',
      name: 'Multi Punch',
      punches: [PunchType.LEFT_STRAIGHT, PunchType.RIGHT_STRAIGHT],
      intervalMs: 500
    };

    const { result, rerender } = renderHook(
      ({ combinations }) =>
        usePlaybackEngine({
          isPlaying: true,
          rate: 60,
          mode: TrainingMode.COMBINATIONS,
          combinations
        }),
      {
        initialProps: { combinations: [multiPunchCombo] }
      }
    );

    const activeSeqId = result.current.currentSequence?.id;
    expect(result.current.currentSequence?.combinationId).toBe('multi-punch');

    // While step 1 is executing, update combinations to empty array
    rerender({ combinations: [] });

    // Advancing through step 1 should still continue current sequence
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Step 2 of active sequence should still be playing under the same sequence snapshot
    expect(result.current.currentSequence?.id).toBe(activeSeqId);
  });
});
