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

export interface ISectorManager {
  readonly index: number;
  readonly repeatCount: number;
}
