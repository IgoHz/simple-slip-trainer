import { SectorPosition } from '@/entities/sector';
import { PunchCombination } from '../model/types';

export const DEFAULT_COMBINATION_INTERVAL_MS = 600;

export const DEFAULT_MIXED_COMBINATION_PROBABILITY = 0.5;

export const PRESET_COMBINATIONS: readonly PunchCombination[] = [
  {
    id: 'jab-cross',
    name: 'Jab–Cross (1–2)',
    punches: [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT
    ],
    description: 'Upper Left Straight → Upper Right Straight'
  },
  {
    id: 'double-jab',
    name: 'Double Jab (1–1)',
    punches: [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_LEFT_STRAIGHT
    ],
    description: 'Upper Left Straight → Upper Left Straight'
  },
  {
    id: 'jab-cross-jab',
    name: 'Jab–Cross–Jab (1–2–1)',
    punches: [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT,
      SectorPosition.UPPER_LEFT_STRAIGHT
    ],
    description:
      'Upper Left Straight → Upper Right Straight → Upper Left Straight'
  },
  {
    id: 'jab-cross-hook',
    name: 'Jab–Cross–Hook (1–2–3)',
    punches: [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT,
      SectorPosition.LEFT_UPPER
    ],
    description: 'Upper Left Straight → Upper Right Straight → Upper Left Hook'
  },
  {
    id: 'jab-hook',
    name: 'Jab–Hook (1–3)',
    punches: [SectorPosition.UPPER_LEFT_STRAIGHT, SectorPosition.LEFT_UPPER],
    description: 'Upper Left Straight → Upper Left Hook'
  },
  {
    id: 'cross-hook',
    name: 'Cross–Hook (2–3)',
    punches: [SectorPosition.UPPER_RIGHT_STRAIGHT, SectorPosition.LEFT_UPPER],
    description: 'Upper Right Straight → Upper Left Hook'
  },
  {
    id: 'jab-cross-hook-cross',
    name: 'Jab–Cross–Hook–Cross (1–2–3–2)',
    punches: [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT,
      SectorPosition.LEFT_UPPER,
      SectorPosition.UPPER_RIGHT_STRAIGHT
    ],
    description:
      'Upper Left Straight → Upper Right Straight → Upper Left Hook → Upper Right Straight'
  },
  {
    id: 'double-jab-cross',
    name: 'Double Jab–Cross (1–1–2)',
    punches: [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT
    ],
    description:
      'Upper Left Straight → Upper Left Straight → Upper Right Straight'
  },
  {
    id: 'jab-cross-left-hook-right-hook',
    name: 'Jab–Cross–Left Hook–Right Hook',
    punches: [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT,
      SectorPosition.LEFT_UPPER,
      SectorPosition.RIGHT_UPPER
    ],
    description:
      'Upper Left Straight → Upper Right Straight → Upper Left Hook → Upper Right Hook'
  },
  {
    id: 'alternating-straights',
    name: 'Alternating Straights',
    punches: [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT,
      SectorPosition.LOWER_LEFT_STRAIGHT,
      SectorPosition.LOWER_RIGHT_STRAIGHT
    ],
    description:
      'Upper Left Straight → Upper Right Straight → Lower Left Straight → Lower Right Straight'
  },
  {
    id: 'jab-cross-body-hook',
    name: 'Jab–Cross–Body Hook',
    punches: [
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT,
      SectorPosition.RIGHT_LOWER
    ],
    description: 'Upper Left Straight → Upper Right Straight → Lower Right Hook'
  }
];
