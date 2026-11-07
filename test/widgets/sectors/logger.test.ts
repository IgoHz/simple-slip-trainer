import { PlaybackSequence } from '@/entities/combination';
import { SectorPosition } from '@/entities/sector';
import { logSequenceDev } from '@/widgets/sectors/lib/logger';
import { vi, type MockInstance } from 'vitest';

describe('logSequenceDev', () => {
  let logSpy: MockInstance;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('does not log in non-development environment when forceLog is false', () => {
    const originalEnv = process.env.NODE_ENV;
    try {
      (process.env as { NODE_ENV: string }).NODE_ENV = 'production';
      const singleSequence: PlaybackSequence = {
        id: 'single-1',
        type: 'single',
        steps: [
          {
            sectorIndex: 0,
            position: SectorPosition.UPPER_LEFT_STRAIGHT,
            durationMs: 500
          }
        ]
      };

      logSequenceDev(singleSequence);
      expect(logSpy).not.toHaveBeenCalled();
    } finally {
      (process.env as { NODE_ENV: string }).NODE_ENV = originalEnv;
    }
  });

  it('logs single punch sequences correctly when forceLog is true', () => {
    const singleSequence: PlaybackSequence = {
      id: 'single-1',
      type: 'single',
      steps: [
        {
          sectorIndex: 0,
          position: SectorPosition.UPPER_LEFT_STRAIGHT,
          durationMs: 500
        }
      ]
    };

    logSequenceDev(singleSequence, true);
    expect(logSpy).toHaveBeenCalledWith(
      `🥊 [Trainer] Single Punch: ${SectorPosition.UPPER_LEFT_STRAIGHT}`
    );
  });

  it('logs combination sequences with name and punch sequence', () => {
    const comboSequence: PlaybackSequence = {
      id: 'combo-1',
      type: 'combination',
      combinationId: 'one-two',
      combinationName: 'Jab–Cross (1–2)',
      steps: [
        {
          sectorIndex: 0,
          position: SectorPosition.UPPER_LEFT_STRAIGHT,
          durationMs: 500
        },
        {
          sectorIndex: 2,
          position: SectorPosition.UPPER_RIGHT_STRAIGHT,
          durationMs: 500
        }
      ]
    };

    logSequenceDev(comboSequence, true);
    expect(logSpy).toHaveBeenCalledWith(
      `🥊 [Trainer] Combo: "Jab–Cross (1–2)" (${SectorPosition.UPPER_LEFT_STRAIGHT} → ${SectorPosition.UPPER_RIGHT_STRAIGHT})`
    );
  });

  it('filters out rest steps from the logged combination punches', () => {
    const comboSequenceWithRest: PlaybackSequence = {
      id: 'combo-2',
      type: 'combination',
      combinationId: 'double-jab',
      combinationName: 'Double Jab (1–1)',
      steps: [
        {
          sectorIndex: -1,
          isRest: true,
          durationMs: 500
        },
        {
          sectorIndex: 0,
          position: SectorPosition.UPPER_LEFT_STRAIGHT,
          durationMs: 500
        },
        {
          sectorIndex: 0,
          position: SectorPosition.UPPER_LEFT_STRAIGHT,
          durationMs: 500
        }
      ]
    };

    logSequenceDev(comboSequenceWithRest, true);
    expect(logSpy).toHaveBeenCalledWith(
      `🥊 [Trainer] Combo: "Double Jab (1–1)" (${SectorPosition.UPPER_LEFT_STRAIGHT} → ${SectorPosition.UPPER_LEFT_STRAIGHT})`
    );
  });

  it('falls back to combinationId if combinationName is not provided', () => {
    const comboSequence: PlaybackSequence = {
      id: 'combo-3',
      type: 'combination',
      combinationId: 'custom-combo',
      steps: [
        {
          sectorIndex: 1,
          position: SectorPosition.LEFT_LOWER,
          durationMs: 500
        }
      ]
    };

    logSequenceDev(comboSequence, true);
    expect(logSpy).toHaveBeenCalledWith(
      `🥊 [Trainer] Combo: "custom-combo" (${SectorPosition.LEFT_LOWER})`
    );
  });
});
