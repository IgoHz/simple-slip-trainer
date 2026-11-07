'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import {
  DEFAULT_MIXED_COMBINATION_PROBABILITY,
  PlaybackSequence,
  PlaybackStep,
  PRESET_COMBINATIONS,
  PunchCombination,
  selectSequence
} from '@/entities/combination';
import { calcRateCoeficient, TrainingMode } from '@/entities/session';
import { logSequenceDev } from './logger';

export interface UsePlaybackEngineOptions {
  isPlaying: boolean;
  rate?: number;
  mode: TrainingMode;
  resetCount?: number;
  combinations?: readonly PunchCombination[];
  mixedProbability?: number;
  defaultIntervalMs?: number;
}

export interface UsePlaybackEngineResult {
  activeSectorIndex: number | null;
  animationDuration: string | undefined;
  animationKey: number;
  currentSequence: PlaybackSequence | null;
}

export function usePlaybackEngine({
  isPlaying,
  rate,
  mode,
  resetCount,
  combinations = PRESET_COMBINATIONS,
  mixedProbability = DEFAULT_MIXED_COMBINATION_PROBABILITY,
  defaultIntervalMs
}: UsePlaybackEngineOptions): UsePlaybackEngineResult {
  const [activeSectorIndex, setActiveSectorIndex] = useState<number | null>(
    null
  );
  const [animationDuration, setAnimationDuration] = useState<
    string | undefined
  >(undefined);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentSequence, setCurrentSequence] =
    useState<PlaybackSequence | null>(null);

  const timerIdRef = useRef<NodeJS.Timeout | number | null>(null);
  const sequenceRef = useRef<PlaybackSequence | null>(null);
  const stepIndexRef = useRef(0);
  const stepRemainingMsRef = useRef(0);
  const stepStartTimeRef = useRef(0);
  const prevIndexRef = useRef(0);
  const prevRepeatCountRef = useRef(0);
  const prevSequenceTypeRef = useRef<'single' | 'combination' | null>(null);

  const clearTimer = () => {
    if (timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  const getRateCadence = () => {
    return Math.max(50, calcRateCoeficient(rate) * 2 * 1000);
  };

  const engine = useEffectEvent(function runEngine(
    action: 'start_or_resume' | 'timeout'
  ) {
    function playStep(step: PlaybackStep, durationMs: number) {
      clearTimer();
      stepStartTimeRef.current = Date.now();
      stepRemainingMsRef.current = durationMs;

      if (step.isRest || step.sectorIndex < 0) {
        setActiveSectorIndex(null);
        setAnimationDuration(undefined);
      } else {
        setActiveSectorIndex(step.sectorIndex);
        const animSeconds = step.durationMs / 2 / 1000;
        setAnimationDuration(`${animSeconds}s`);
        setAnimationKey((prev) => prev + 1);
      }

      timerIdRef.current = setTimeout(() => {
        runEngine('timeout');
      }, durationMs);
    }

    function startNext() {
      const rateCadence = getRateCadence();
      const result = selectSequence({
        mode,
        rateCadence,
        combinations,
        mixedProbability,
        defaultIntervalMs,
        prevIndex: prevIndexRef.current,
        prevRepeatCount: prevRepeatCountRef.current,
        prevSequenceType: prevSequenceTypeRef.current ?? undefined
      });

      prevIndexRef.current = result.nextIndex;
      prevRepeatCountRef.current = result.nextRepeatCount;
      prevSequenceTypeRef.current = result.sequence.type;
      sequenceRef.current = result.sequence;
      setCurrentSequence(result.sequence);
      stepIndexRef.current = 0;

      logSequenceDev(result.sequence);

      const firstStep = result.sequence.steps[0];
      if (firstStep) {
        playStep(firstStep, firstStep.durationMs);
      }
    }

    if (action === 'timeout') {
      timerIdRef.current = null;
      const seq = sequenceRef.current;
      if (!seq) {
        return;
      }
      const nextIndex = stepIndexRef.current + 1;
      if (nextIndex < seq.steps.length) {
        stepIndexRef.current = nextIndex;
        playStep(seq.steps[nextIndex], seq.steps[nextIndex].durationMs);
      } else {
        sequenceRef.current = null;
        setCurrentSequence(null);
        stepIndexRef.current = 0;
        stepRemainingMsRef.current = 0;
        startNext();
      }
      return;
    }

    if (action === 'start_or_resume') {
      const seq = sequenceRef.current;
      if (seq && stepIndexRef.current < seq.steps.length) {
        const currentStep = seq.steps[stepIndexRef.current];
        const remaining =
          stepRemainingMsRef.current > 0
            ? stepRemainingMsRef.current
            : currentStep.durationMs;
        playStep(currentStep, remaining);
      } else {
        startNext();
      }
    }
  });

  const prevResetCountRef = useRef(resetCount);
  const prevModeRef = useRef(mode);

  useEffect(() => {
    if (resetCount !== undefined && resetCount !== prevResetCountRef.current) {
      prevResetCountRef.current = resetCount;
      clearTimer();
      sequenceRef.current = null;
      prevSequenceTypeRef.current = null;
      stepIndexRef.current = 0;
      stepRemainingMsRef.current = 0;
      setActiveSectorIndex(null);
      setAnimationDuration(undefined);
      setCurrentSequence(null);
      return;
    }

    if (!isPlaying) {
      if (timerIdRef.current !== null) {
        clearTimer();
        const elapsed = Date.now() - stepStartTimeRef.current;
        stepRemainingMsRef.current = Math.max(
          0,
          stepRemainingMsRef.current - elapsed
        );
      }
      return;
    }

    if (mode !== prevModeRef.current) {
      prevModeRef.current = mode;
      clearTimer();
      sequenceRef.current = null;
      prevSequenceTypeRef.current = null;
      stepIndexRef.current = 0;
      stepRemainingMsRef.current = 0;
    }

    engine('start_or_resume');

    return () => {
      clearTimer();
      const elapsed = Date.now() - stepStartTimeRef.current;
      stepRemainingMsRef.current = Math.max(
        0,
        stepRemainingMsRef.current - elapsed
      );
    };
  }, [isPlaying, resetCount, mode]);

  let displaySectorIndex: number | null = null;
  let displayAnimationDuration: string | undefined = undefined;

  if (isPlaying) {
    displaySectorIndex = activeSectorIndex;
    displayAnimationDuration = animationDuration;
  }

  return {
    activeSectorIndex: displaySectorIndex,
    animationDuration: displayAnimationDuration,
    animationKey,
    currentSequence
  };
}
