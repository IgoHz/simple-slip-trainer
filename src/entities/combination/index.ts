export type {
  CombinationPunch,
  PunchCombination,
  PlaybackStep,
  PlaybackSequence
} from './model/types';

export {
  PRESET_COMBINATIONS,
  DEFAULT_COMBINATION_INTERVAL_MS,
  DEFAULT_MIXED_COMBINATION_PROBABILITY
} from './config/combinations';

export {
  selectSequence,
  resolveSectorIndexForPunch,
  validateCombination
} from './lib/sequence-selector';
export type {
  SelectSequenceParams,
  SelectSequenceResult
} from './lib/sequence-selector';
