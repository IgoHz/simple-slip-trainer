export enum SectorPosition {
  LEFT_UPPER = 'leftUpper',
  LEFT_LOWER = 'leftLower',
  RIGHT_UPPER = 'rightUpper',
  RIGHT_LOWER = 'rightLower'
}

export enum SectorDisplayType {
  DEFAULT = 'default',
  ANIMATED = 'animated'
}

export const config: SectorPosition[] = [
  SectorPosition.LEFT_UPPER,
  SectorPosition.RIGHT_UPPER,
  SectorPosition.LEFT_LOWER,
  SectorPosition.RIGHT_LOWER
];
