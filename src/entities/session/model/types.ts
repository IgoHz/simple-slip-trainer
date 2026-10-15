export interface SessionState {
  rate: number;
  isPlaying: boolean;
  setRate: (rate: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

// Backward compatibility type alias
export type State = SessionState;
