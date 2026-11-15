import { CombinationPunch } from '@/entities/combination';
import { PunchType, SectorPosition, toPunchType } from '@/entities/sector';

export { toPunchType };

export enum PunchLevel {
  UPPER = 'upper',
  LOWER = 'lower'
}

export const ALL_PUNCH_TYPES: readonly PunchType[] = [
  PunchType.LEFT_STRAIGHT,
  PunchType.RIGHT_STRAIGHT,
  PunchType.LEFT_HOOK,
  PunchType.RIGHT_HOOK
];

export const PUNCH_LABELS: Record<PunchType, string> = {
  [PunchType.LEFT_STRAIGHT]: 'Left Straight',
  [PunchType.RIGHT_STRAIGHT]: 'Right Straight',
  [PunchType.LEFT_HOOK]: 'Left Hook',
  [PunchType.RIGHT_HOOK]: 'Right Hook'
};

export const PUNCH_SHORT_LABELS: Record<PunchType, string> = {
  [PunchType.LEFT_STRAIGHT]: 'LS',
  [PunchType.RIGHT_STRAIGHT]: 'RS',
  [PunchType.LEFT_HOOK]: 'LH',
  [PunchType.RIGHT_HOOK]: 'RH'
};

export function isStraightPunch(punchType: PunchType): boolean {
  return (
    punchType === PunchType.LEFT_STRAIGHT ||
    punchType === PunchType.RIGHT_STRAIGHT
  );
}

export function getPunchLevel(punch: CombinationPunch): PunchLevel {
  switch (punch) {
    case SectorPosition.LEFT_LOWER:
    case SectorPosition.RIGHT_LOWER:
    case SectorPosition.LOWER_LEFT_STRAIGHT:
    case SectorPosition.LOWER_RIGHT_STRAIGHT:
      return PunchLevel.LOWER;
    case SectorPosition.LEFT_UPPER:
    case SectorPosition.RIGHT_UPPER:
    case SectorPosition.UPPER_LEFT_STRAIGHT:
    case SectorPosition.UPPER_RIGHT_STRAIGHT:
    default:
      return PunchLevel.UPPER;
  }
}

export function getSectorPosition(
  punchType: PunchType,
  level: PunchLevel
): SectorPosition {
  if (level === PunchLevel.UPPER) {
    switch (punchType) {
      case PunchType.LEFT_STRAIGHT:
        return SectorPosition.UPPER_LEFT_STRAIGHT;
      case PunchType.RIGHT_STRAIGHT:
        return SectorPosition.UPPER_RIGHT_STRAIGHT;
      case PunchType.LEFT_HOOK:
        return SectorPosition.LEFT_UPPER;
      case PunchType.RIGHT_HOOK:
        return SectorPosition.RIGHT_UPPER;
    }
  } else {
    switch (punchType) {
      case PunchType.LEFT_STRAIGHT:
        return SectorPosition.LOWER_LEFT_STRAIGHT;
      case PunchType.RIGHT_STRAIGHT:
        return SectorPosition.LOWER_RIGHT_STRAIGHT;
      case PunchType.LEFT_HOOK:
        return SectorPosition.LEFT_LOWER;
      case PunchType.RIGHT_HOOK:
        return SectorPosition.RIGHT_LOWER;
    }
  }
}

export function toSectorPosition(
  punch: CombinationPunch,
  fallbackLevel: PunchLevel = PunchLevel.UPPER
): SectorPosition {
  const validPositions = Object.values(SectorPosition) as string[];
  if (validPositions.includes(punch)) {
    return punch as SectorPosition;
  }
  return getSectorPosition(punch as PunchType, fallbackLevel);
}

export function togglePunchLevel(punch: CombinationPunch): SectorPosition {
  const punchType = toPunchType(punch);
  const currentLevel = getPunchLevel(punch);
  const nextLevel =
    currentLevel === PunchLevel.UPPER ? PunchLevel.LOWER : PunchLevel.UPPER;
  return getSectorPosition(punchType, nextLevel);
}

export const HIGH_PUNCH_POSITIONS: readonly SectorPosition[] = [
  SectorPosition.UPPER_LEFT_STRAIGHT,
  SectorPosition.UPPER_RIGHT_STRAIGHT,
  SectorPosition.LEFT_UPPER,
  SectorPosition.RIGHT_UPPER
];

export const LOW_PUNCH_POSITIONS: readonly SectorPosition[] = [
  SectorPosition.LOWER_LEFT_STRAIGHT,
  SectorPosition.LOWER_RIGHT_STRAIGHT,
  SectorPosition.LEFT_LOWER,
  SectorPosition.RIGHT_LOWER
];

export const ALL_PUNCH_POSITIONS: readonly SectorPosition[] = [
  ...HIGH_PUNCH_POSITIONS,
  ...LOW_PUNCH_POSITIONS
];

export const PUNCH_POSITION_LABELS: Record<SectorPosition, string> = {
  [SectorPosition.UPPER_LEFT_STRAIGHT]: 'Upper Left Straight',
  [SectorPosition.UPPER_RIGHT_STRAIGHT]: 'Upper Right Straight',
  [SectorPosition.LEFT_UPPER]: 'Upper Left Hook',
  [SectorPosition.RIGHT_UPPER]: 'Upper Right Hook',
  [SectorPosition.LOWER_LEFT_STRAIGHT]: 'Lower Left Straight',
  [SectorPosition.LOWER_RIGHT_STRAIGHT]: 'Lower Right Straight',
  [SectorPosition.LEFT_LOWER]: 'Lower Left Hook',
  [SectorPosition.RIGHT_LOWER]: 'Lower Right Hook'
};
