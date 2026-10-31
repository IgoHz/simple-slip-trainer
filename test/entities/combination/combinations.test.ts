import {
  DEFAULT_COMBINATION_INTERVAL_MS,
  DEFAULT_MIXED_COMBINATION_PROBABILITY,
  PRESET_COMBINATIONS,
  validateCombination
} from '@/entities/combination';
import { PunchType, SectorPosition, toPunchType } from '@/entities/sector';

describe('Combination Presets and Data Model', () => {
  it('defines valid defaults', () => {
    expect(DEFAULT_COMBINATION_INTERVAL_MS).toBe(600);
    expect(DEFAULT_MIXED_COMBINATION_PROBABILITY).toBe(0.5);
  });

  it('contains all 11 suggested boxing combination presets', () => {
    expect(PRESET_COMBINATIONS).toHaveLength(11);

    const ids = PRESET_COMBINATIONS.map((c) => c.id);
    expect(ids).toEqual([
      'jab-cross',
      'double-jab',
      'jab-cross-jab',
      'jab-cross-hook',
      'jab-hook',
      'cross-hook',
      'jab-cross-hook-cross',
      'double-jab-cross',
      'jab-cross-left-hook-right-hook',
      'alternating-straights',
      'jab-cross-body-hook'
    ]);
  });

  it('all presets have valid unique IDs, non-empty names, and non-empty punches', () => {
    const idSet = new Set<string>();
    for (const combo of PRESET_COMBINATIONS) {
      expect(validateCombination(combo)).toBe(true);
      expect(combo.id).toBeTruthy();
      expect(idSet.has(combo.id)).toBe(false);
      idSet.add(combo.id);

      expect(combo.name).toBeTruthy();
      expect(combo.punches.length).toBeGreaterThan(0);
    }
  });

  it('supports all 4 punch types across presets and includes both upper and lower variants', () => {
    const seenPunches = new Set<PunchType>();
    const seenPositions = new Set<SectorPosition>();
    for (const combo of PRESET_COMBINATIONS) {
      for (const punch of combo.punches) {
        seenPunches.add(toPunchType(punch));
        if (Object.values(SectorPosition).includes(punch as SectorPosition)) {
          seenPositions.add(punch as SectorPosition);
        }
      }
    }

    expect(seenPunches.has(PunchType.LEFT_STRAIGHT)).toBe(true);
    expect(seenPunches.has(PunchType.RIGHT_STRAIGHT)).toBe(true);
    expect(seenPunches.has(PunchType.LEFT_HOOK)).toBe(true);
    expect(seenPunches.has(PunchType.RIGHT_HOOK)).toBe(true);

    expect(seenPositions.has(SectorPosition.UPPER_LEFT_STRAIGHT)).toBe(true);
    expect(seenPositions.has(SectorPosition.LOWER_LEFT_STRAIGHT)).toBe(true);
    expect(seenPositions.has(SectorPosition.LEFT_UPPER)).toBe(true);
    expect(seenPositions.has(SectorPosition.RIGHT_LOWER)).toBe(true);
  });

  it('preserves exact punch sequences with direct upper and lower selections', () => {
    const jabCross = PRESET_COMBINATIONS.find((c) => c.id === 'jab-cross');
    expect(jabCross?.punches).toEqual([
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT
    ]);

    const doubleJab = PRESET_COMBINATIONS.find((c) => c.id === 'double-jab');
    expect(doubleJab?.punches).toEqual([
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_LEFT_STRAIGHT
    ]);

    const jabCrossHook = PRESET_COMBINATIONS.find(
      (c) => c.id === 'jab-cross-hook'
    );
    expect(jabCrossHook?.punches).toEqual([
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT,
      SectorPosition.LEFT_UPPER
    ]);

    const alternating = PRESET_COMBINATIONS.find(
      (c) => c.id === 'alternating-straights'
    );
    expect(alternating?.punches).toEqual([
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT,
      SectorPosition.LOWER_LEFT_STRAIGHT,
      SectorPosition.LOWER_RIGHT_STRAIGHT
    ]);

    const jabCrossBodyHook = PRESET_COMBINATIONS.find(
      (c) => c.id === 'jab-cross-body-hook'
    );
    expect(jabCrossBodyHook?.punches).toEqual([
      SectorPosition.UPPER_LEFT_STRAIGHT,
      SectorPosition.UPPER_RIGHT_STRAIGHT,
      SectorPosition.RIGHT_LOWER
    ]);
  });

  it('validateCombination correctly rejects invalid inputs', () => {
    expect(validateCombination(null)).toBe(false);
    expect(validateCombination(undefined)).toBe(false);
    expect(validateCombination('string')).toBe(false);
    expect(validateCombination({})).toBe(false);
    expect(validateCombination({ id: '', name: 'Test', punches: [] })).toBe(
      false
    );
    expect(
      validateCombination({
        id: 'test',
        name: '',
        punches: [PunchType.LEFT_HOOK]
      })
    ).toBe(false);
    expect(
      validateCombination({
        id: 'test',
        name: 'Test',
        punches: ['invalid-punch']
      })
    ).toBe(false);
    expect(validateCombination({ id: 'test', name: 'Test', punches: [] })).toBe(
      false
    );
  });
});
