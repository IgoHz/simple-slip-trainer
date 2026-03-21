import { config as sectorPositionsConfig } from '../config/sector-positions';

export function sectorFactory(repeatCount: number, prevSector: number) {
  return new SectorManager(sectorPositionsConfig.length, repeatCount, prevSector);
}

interface ISectorManager {
  readonly index: number;
  readonly repeatCount: number;
}

class SectorManager implements ISectorManager {
  private MAX_REPEAT_COUNT = 2;

  private _sectorsAmount: number;
  private _repeatCount: number;
  private _index: number;

  constructor(sectorsAmount: number, repeatCount: number, prevIndex: number) {
    this._sectorsAmount = sectorsAmount;
    this._repeatCount = repeatCount;
    this._index = this.getNextIndex(prevIndex);
  }

  get index() {
    return this._index;
  }

  get repeatCount() {
    return this._repeatCount;
  }

  private getNextIndex(prevSector: number) {
    let nextSector = this.getRandomIndex();

    if (prevSector === nextSector) {
      this._repeatCount += 1;
    } else {
      this._repeatCount = 1;
    }

    if (this._repeatCount > this.MAX_REPEAT_COUNT) {
      nextSector = this.getNextIndex(prevSector);
    }

    return nextSector;
  }

  private getRandomIndex() {
    return Math.floor(Math.random() * this._sectorsAmount);
  }
}
