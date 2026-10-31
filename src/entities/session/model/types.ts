export enum TrainingMode {
  RANDOM_SINGLES = 'randomSingles',
  COMBINATIONS = 'combinations',
  MIXED = 'mixed'
}

export interface SessionState {
  rate: number;
  isPlaying: boolean;
  mode: TrainingMode;
  resetCount: number;
  setRate: (rate: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setMode: (mode: TrainingMode) => void;
  resetSession: () => void;
}

// Backward compatibility type alias
export type State = SessionState;
