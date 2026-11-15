import { PunchType, SectorPosition } from '@/entities/sector';

export type CombinationPunch = SectorPosition | PunchType;

export type PunchCombination = {
  id: string;
  name: string;
  punches: readonly CombinationPunch[];
  description?: string;
  intervalMs?: number;
};

export interface PlaybackStep {
  sectorIndex: number;
  position?: SectorPosition;
  punchType?: PunchType;
  durationMs: number;
  isRest?: boolean;
}

export interface PlaybackSequence {
  id: string;
  type: 'single' | 'combination';
  combinationId?: string;
  combinationName?: string;
  steps: PlaybackStep[];
}

export interface CombinationState {
  combinations: PunchCombination[];
  addCombination: (
    combo: Omit<PunchCombination, 'id'> & { id?: string }
  ) => PunchCombination;
  updateCombination: (
    id: string,
    updates: Partial<Omit<PunchCombination, 'id'>>
  ) => void;
  deleteCombination: (id: string) => void;
  resetToDefaults: () => void;
  setCombinations: (combinations: PunchCombination[]) => void;
}
