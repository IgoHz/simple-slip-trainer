export enum SectorPosition {
  LEFT_UPPER = 'leftUpper',
  LEFT_LOWER = 'leftLower',
  RIGHT_UPPER = 'rightUpper',
  RIGHT_LOWER = 'rightLower',
  UPPER_LEFT_STRAIGHT = 'upperLeftStraight',
  UPPER_RIGHT_STRAIGHT = 'upperRightStraight',
  LOWER_LEFT_STRAIGHT = 'lowerLeftStraight',
  LOWER_RIGHT_STRAIGHT = 'lowerRightStraight'
}

export enum PunchType {
  LEFT_HOOK = 'leftHook',
  RIGHT_HOOK = 'rightHook',
  LEFT_STRAIGHT = 'leftStraight',
  RIGHT_STRAIGHT = 'rightStraight'
}

export function getPunchType(position: SectorPosition): PunchType {
  switch (position) {
    case SectorPosition.LEFT_UPPER:
    case SectorPosition.LEFT_LOWER:
      return PunchType.LEFT_HOOK;
    case SectorPosition.RIGHT_UPPER:
    case SectorPosition.RIGHT_LOWER:
      return PunchType.RIGHT_HOOK;
    case SectorPosition.UPPER_LEFT_STRAIGHT:
    case SectorPosition.LOWER_LEFT_STRAIGHT:
      return PunchType.LEFT_STRAIGHT;
    case SectorPosition.UPPER_RIGHT_STRAIGHT:
    case SectorPosition.LOWER_RIGHT_STRAIGHT:
      return PunchType.RIGHT_STRAIGHT;
  }
}

export function toPunchType(punch: SectorPosition | PunchType): PunchType {
  const punchTypes = Object.values(PunchType);
  if (punchTypes.includes(punch as PunchType)) {
    return punch as PunchType;
  }
  return getPunchType(punch as SectorPosition);
}

export const PUNCH_TYPE_TO_POSITIONS: Record<
  PunchType,
  readonly SectorPosition[]
> = {
  [PunchType.LEFT_HOOK]: [SectorPosition.LEFT_UPPER, SectorPosition.LEFT_LOWER],
  [PunchType.RIGHT_HOOK]: [
    SectorPosition.RIGHT_UPPER,
    SectorPosition.RIGHT_LOWER
  ],
  [PunchType.LEFT_STRAIGHT]: [
    SectorPosition.UPPER_LEFT_STRAIGHT,
    SectorPosition.LOWER_LEFT_STRAIGHT
  ],
  [PunchType.RIGHT_STRAIGHT]: [
    SectorPosition.UPPER_RIGHT_STRAIGHT,
    SectorPosition.LOWER_RIGHT_STRAIGHT
  ]
};

export enum SectorDisplayType {
  DEFAULT = 'default',
  ANIMATED = 'animated'
}

export interface ISectorManager {
  readonly index: number;
  readonly repeatCount: number;
}
