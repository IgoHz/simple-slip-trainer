import { sectorFactory } from '../../../../src/features/trainer/utils/sector';
import { config as sectorPositionsConfig } from '../../../../src/features/trainer/config/sector';

describe('sectorFactory and SectorManager', () => {
  it('returns a sector manager with valid index and repeatCount', () => {
    const prevIndex = 0;
    const prevRepeatCount = 1;
    const manager = sectorFactory(prevIndex, prevRepeatCount);
    expect(manager.index).toBeGreaterThanOrEqual(0);
    expect(manager.index).toBeLessThan(sectorPositionsConfig.length);
    expect(manager.repeatCount).toBeGreaterThanOrEqual(1);
    expect(manager.repeatCount).toBeLessThanOrEqual(2);
  });

  it('repeatCount increments if index repeats', () => {
    // Simulate by calling sectorFactory twice with same index and repeatCount
    const prevIndex = 1;
    const prevRepeatCount = 1;
    // First, get a manager and its index
    const firstManager = sectorFactory(prevIndex, prevRepeatCount);
    // If the index repeats, repeatCount should increment
    const repeatedManager = sectorFactory(firstManager.index, prevRepeatCount);
    if (repeatedManager.index === firstManager.index) {
      expect(repeatedManager.repeatCount).toBe(prevRepeatCount + 1);
    } else {
      // If not repeated, repeatCount should reset to 1
      expect(repeatedManager.repeatCount).toBe(1);
    }
  });

  it('repeatCount resets if index changes', () => {
    const prevIndex = 1;
    const prevRepeatCount = 2;
    // Get a manager with a different index
    let changedIndex = prevIndex;
    while (changedIndex === prevIndex) {
      changedIndex = sectorFactory(prevIndex, prevRepeatCount).index;
    }
    const changedManager = sectorFactory(changedIndex, prevRepeatCount);
    expect(changedManager.repeatCount).toBe(1);
  });

  it('never repeats index more than MAX_REPEAT_COUNT', () => {
    const prevIndex = 2;
    const prevRepeatCount = 2;
    // When repeatCount is at max, sectorFactory should not repeat prevIndex
    let foundDifferent = false;
    for (let i = 0; i < 10; i++) {
      const manager = sectorFactory(prevIndex, prevRepeatCount);
      if (manager.index !== prevIndex) {
        foundDifferent = true;
        break;
      }
    }
    expect(foundDifferent).toBe(true);
  });
});
