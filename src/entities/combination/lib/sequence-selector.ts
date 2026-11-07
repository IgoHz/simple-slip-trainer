import {
  getPunchType,
  PunchType,
  PUNCH_TYPE_TO_POSITIONS,
  SectorPosition,
  sectorFactory,
  sectorPositionsConfig
} from '@/entities/sector';
import { TrainingMode } from '@/entities/session';
import {
  DEFAULT_MIXED_COMBINATION_PROBABILITY,
  PRESET_COMBINATIONS
} from '../config/combinations';
import {
  CombinationPunch,
  PlaybackSequence,
  PlaybackStep,
  PunchCombination
} from '../model/types';

export interface SelectSequenceParams {
  mode: TrainingMode;
  rateCadence: number;
  combinations?: readonly PunchCombination[];
  mixedProbability?: number;
  defaultIntervalMs?: number;
  prevIndex?: number;
  prevRepeatCount?: number;
  prevSequenceType?: 'single' | 'combination';
}

export interface SelectSequenceResult {
  sequence: PlaybackSequence;
  nextIndex: number;
  nextRepeatCount: number;
}

export function validateCombination(combo: unknown): combo is PunchCombination {
  if (!combo || typeof combo !== 'object') {
    return false;
  }
  const candidate = combo as Record<string, unknown>;
  if (
    typeof candidate.id !== 'string' ||
    candidate.id.trim() === '' ||
    typeof candidate.name !== 'string' ||
    candidate.name.trim() === '' ||
    !Array.isArray(candidate.punches) ||
    candidate.punches.length === 0
  ) {
    return false;
  }
  const validSectors = Object.values(SectorPosition) as string[];
  const validPunchTypes = Object.values(PunchType) as string[];
  return candidate.punches.every(
    (p) =>
      typeof p === 'string' &&
      (validSectors.includes(p) || validPunchTypes.includes(p))
  );
}

export function resolveSectorIndexForPunch(
  punch: CombinationPunch,
  prevIndex?: number,
  randomFn: () => number = Math.random
): number {
  const directIndex = sectorPositionsConfig.indexOf(punch as SectorPosition);
  if (directIndex !== -1) {
    return directIndex;
  }

  const candidatePositions = PUNCH_TYPE_TO_POSITIONS[punch as PunchType];
  if (!candidatePositions || candidatePositions.length === 0) {
    return 0;
  }

  const candidateIndices = candidatePositions.map((pos) =>
    sectorPositionsConfig.indexOf(pos)
  );

  if (prevIndex !== undefined && candidateIndices.includes(prevIndex)) {
    const alternate = candidateIndices.find((idx) => idx !== prevIndex);
    if (alternate !== undefined) {
      return alternate;
    }
  }

  const randIdx = Math.floor(randomFn() * candidateIndices.length);
  return candidateIndices[randIdx];
}

export function selectSequence(
  params: SelectSequenceParams,
  randomFn: () => number = Math.random
): SelectSequenceResult {
  const {
    mode,
    rateCadence,
    combinations = PRESET_COMBINATIONS,
    mixedProbability = DEFAULT_MIXED_COMBINATION_PROBABILITY,
    defaultIntervalMs,
    prevIndex = 0,
    prevRepeatCount = 0,
    prevSequenceType
  } = params;

  if (mode === TrainingMode.RANDOM_SINGLES) {
    return selectSinglePunchSequence(prevIndex, prevRepeatCount, rateCadence);
  }

  if (mode === TrainingMode.COMBINATIONS) {
    return selectCombinationSequence(
      combinations,
      defaultIntervalMs,
      rateCadence,
      prevIndex,
      prevRepeatCount,
      randomFn
    );
  }

  // MIXED mode
  const shouldPlayCombination = randomFn() < mixedProbability;
  if (shouldPlayCombination) {
    const leadRest = prevSequenceType === 'single';
    return selectCombinationSequence(
      combinations,
      defaultIntervalMs,
      rateCadence,
      prevIndex,
      prevRepeatCount,
      randomFn,
      leadRest
    );
  }

  return selectSinglePunchSequence(prevIndex, prevRepeatCount, rateCadence);
}

function selectSinglePunchSequence(
  prevIndex: number,
  prevRepeatCount: number,
  rateCadence: number
): SelectSequenceResult {
  const manager = sectorFactory(prevIndex, prevRepeatCount);
  const position = sectorPositionsConfig[manager.index];
  const punchType = getPunchType(position);

  return {
    sequence: {
      id: `single-${Date.now()}-${manager.index}`,
      type: 'single',
      steps: [
        {
          sectorIndex: manager.index,
          position,
          punchType,
          durationMs: rateCadence
        }
      ]
    },
    nextIndex: manager.index,
    nextRepeatCount: manager.repeatCount
  };
}

function selectCombinationSequence(
  combinations: readonly PunchCombination[],
  defaultIntervalMs: number | undefined,
  rateCadence: number,
  prevIndex: number,
  prevRepeatCount: number,
  randomFn: () => number,
  leadRest = false
): SelectSequenceResult {
  const validCombinations = combinations.filter(validateCombination);

  if (validCombinations.length === 0) {
    return selectSinglePunchSequence(prevIndex, prevRepeatCount, rateCadence);
  }

  const comboIndex = Math.floor(randomFn() * validCombinations.length);
  const chosenCombo = validCombinations[comboIndex];

  const steps: PlaybackStep[] = [];

  // Rest delay before combo when preceded by a single punch
  if (leadRest) {
    steps.push({
      sectorIndex: -1,
      durationMs: rateCadence,
      isRest: true
    });
  }

  let lastIndex = prevIndex;
  const intervalMs = Math.max(
    50,
    chosenCombo.intervalMs ?? defaultIntervalMs ?? rateCadence
  );

  for (const punch of chosenCombo.punches) {
    const sectorIndex = resolveSectorIndexForPunch(punch, lastIndex, randomFn);
    lastIndex = sectorIndex;
    const position = sectorPositionsConfig[sectorIndex];
    const punchType = getPunchType(position);
    steps.push({
      sectorIndex,
      position,
      punchType,
      durationMs: intervalMs
    });
  }

  // Cooldown / reset between sequences governed by training rate
  steps.push({
    sectorIndex: -1,
    durationMs: rateCadence,
    isRest: true
  });

  return {
    sequence: {
      id: `${chosenCombo.id}-${Date.now()}`,
      type: 'combination',
      combinationId: chosenCombo.id,
      combinationName: chosenCombo.name,
      steps
    },
    nextIndex: lastIndex,
    nextRepeatCount: 1
  };
}
