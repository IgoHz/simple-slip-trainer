import { config as sectorPositionsConfig } from '../config/sector';

interface ISectorManager {
  readonly index: number;
  readonly repeatCount: number;
}

export function sectorFactory(
  prevIndex: number,
  prevRepeatCount: number
): ISectorManager {
  return new SectorManager(
    sectorPositionsConfig.length,
    prevIndex,
    prevRepeatCount
  );
}

class SectorManager implements ISectorManager {
  private MAX_REPEAT_COUNT = 2;

  private _sectorsAmount: number;
  private _index: number;
  private _repeatCount: number;

  constructor(
    sectorsAmount: number,
    prevIndex: number,
    prevRepeatCount: number
  ) {
    this._sectorsAmount = sectorsAmount;
    this._index = this.calcNextIndex(prevIndex, prevRepeatCount);
    this._repeatCount = this.calcNextRepeatCount(prevIndex, prevRepeatCount);
  }

  get index() {
    return this._index;
  }

  get repeatCount() {
    return this._repeatCount;
  }

  private calcNextIndex(prevIndex: number, prevRepeatCount: number) {
    const excludedIndex =
      prevRepeatCount === this.MAX_REPEAT_COUNT ? prevIndex : undefined;
    const nextIndex = this.getRandomIndexWithExclusion(excludedIndex);
    return nextIndex;
  }

  private getRandomIndexWithExclusion(excludedIndex?: number) {
    let randomIndex;
    do {
      randomIndex = this.getRandomIndex();
    } while (excludedIndex === randomIndex);
    return randomIndex;
  }

  private getRandomIndex() {
    return Math.floor(Math.random() * this._sectorsAmount);
  }

  private calcNextRepeatCount(prevIndex: number, prevRepeatCount: number) {
    let nextRepeatCount = prevRepeatCount;
    if (prevIndex === this._index) {
      nextRepeatCount += 1;
    } else {
      nextRepeatCount = 1;
    }
    return nextRepeatCount;
  }
}
