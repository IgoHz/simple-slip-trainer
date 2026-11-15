import { beforeEach, describe, expect, it } from 'vitest';
import {
  createCombinationStorage,
  generateCombinationId,
  PRESET_COMBINATIONS,
  PunchCombination,
  useCombinationStore
} from '@/entities/combination';
import { PunchType } from '@/entities/sector';

describe('useCombinationStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useCombinationStore.getState().resetToDefaults();
  });

  it('loads default presets when storage is empty', () => {
    const combinations = useCombinationStore.getState().combinations;
    expect(combinations).toHaveLength(PRESET_COMBINATIONS.length);
    expect(combinations[0].id).toBe(PRESET_COMBINATIONS[0].id);
    expect(combinations[0].name).toBe(PRESET_COMBINATIONS[0].name);
  });

  it('adds a new combination and persists it', () => {
    const store = useCombinationStore.getState();
    const newCombo = store.addCombination({
      name: '  Custom Combo 1-2-1  ',
      punches: [
        PunchType.LEFT_STRAIGHT,
        PunchType.RIGHT_STRAIGHT,
        PunchType.LEFT_STRAIGHT
      ]
    });

    expect(newCombo.id).toBeTruthy();
    expect(newCombo.name).toBe('Custom Combo 1-2-1');
    expect(newCombo.punches).toEqual([
      PunchType.LEFT_STRAIGHT,
      PunchType.RIGHT_STRAIGHT,
      PunchType.LEFT_STRAIGHT
    ]);

    const state = useCombinationStore.getState();
    expect(state.combinations).toHaveLength(PRESET_COMBINATIONS.length + 1);
    expect(state.combinations.find((c) => c.id === newCombo.id)).toEqual(
      newCombo
    );
  });

  it('supports duplicate punch types and preserves punch order', () => {
    const store = useCombinationStore.getState();
    const combo = store.addCombination({
      name: 'Triple Jab',
      punches: [
        PunchType.LEFT_STRAIGHT,
        PunchType.LEFT_STRAIGHT,
        PunchType.LEFT_STRAIGHT
      ]
    });

    expect(combo.punches).toEqual([
      PunchType.LEFT_STRAIGHT,
      PunchType.LEFT_STRAIGHT,
      PunchType.LEFT_STRAIGHT
    ]);
  });

  it('updates an existing combination without modifying other combinations or changing its ID', () => {
    const store = useCombinationStore.getState();
    const originalFirst = store.combinations[0];
    const originalSecond = store.combinations[1];

    store.updateCombination(originalFirst.id, {
      name: '  Updated Jab-Cross  ',
      punches: [PunchType.LEFT_HOOK, PunchType.RIGHT_HOOK]
    });

    const updated = useCombinationStore.getState().combinations;
    const modified = updated.find((c) => c.id === originalFirst.id);
    const untouched = updated.find((c) => c.id === originalSecond.id);

    expect(modified?.id).toBe(originalFirst.id);
    expect(modified?.name).toBe('Updated Jab-Cross');
    expect(modified?.punches).toEqual([
      PunchType.LEFT_HOOK,
      PunchType.RIGHT_HOOK
    ]);
    expect(untouched).toEqual(originalSecond);
  });

  it('deletes a combination from the collection and persists removal', () => {
    const store = useCombinationStore.getState();
    const targetId = store.combinations[0].id;

    store.deleteCombination(targetId);

    const updated = useCombinationStore.getState().combinations;
    expect(updated).toHaveLength(PRESET_COMBINATIONS.length - 1);
    expect(updated.find((c) => c.id === targetId)).toBeUndefined();
  });

  it('resets combinations back to default presets', () => {
    const store = useCombinationStore.getState();
    store.addCombination({
      name: 'Temp Combo',
      punches: [PunchType.LEFT_HOOK]
    });
    expect(useCombinationStore.getState().combinations.length).toBe(
      PRESET_COMBINATIONS.length + 1
    );

    useCombinationStore.getState().resetToDefaults();
    expect(useCombinationStore.getState().combinations).toEqual([
      ...PRESET_COMBINATIONS
    ]);
  });

  it('generateCombinationId generates unique IDs', () => {
    const id1 = generateCombinationId();
    const id2 = generateCombinationId();
    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });

  describe('createCombinationStorage', () => {
    const storage = createCombinationStorage();

    it('returns null when storage is empty', () => {
      localStorage.clear();
      expect(storage.getItem('combinations')).toBeNull();
    });

    it('returns persisted combinations when valid data is in storage', () => {
      const validCombo: PunchCombination = {
        id: 'test-1',
        name: 'Test Combo',
        punches: [PunchType.LEFT_STRAIGHT, PunchType.RIGHT_HOOK]
      };
      localStorage.setItem(
        'combinations',
        JSON.stringify({
          state: { combinations: [validCombo] },
          version: 1
        })
      );

      const loaded = storage.getItem('combinations');
      expect(loaded).toEqual({
        state: { combinations: [validCombo] },
        version: 1
      });
    });

    it('handles malformed JSON gracefully by returning null', () => {
      localStorage.setItem('combinations', 'invalid-json{{{');
      expect(storage.getItem('combinations')).toBeNull();
    });

    it('handles non-object parsed JSON gracefully by returning null', () => {
      localStorage.setItem('combinations', JSON.stringify('just-a-string'));
      expect(storage.getItem('combinations')).toBeNull();
    });

    it('handles invalid state structure gracefully by returning null', () => {
      localStorage.setItem(
        'combinations',
        JSON.stringify({ state: 'invalid' })
      );
      expect(storage.getItem('combinations')).toBeNull();
    });

    it('handles non-array combinations gracefully by returning null', () => {
      localStorage.setItem(
        'combinations',
        JSON.stringify({ state: { combinations: 'not-an-array' } })
      );
      expect(storage.getItem('combinations')).toBeNull();
    });

    it('filters out invalid items and keeps valid ones', () => {
      const validCombo: PunchCombination = {
        id: 'valid-1',
        name: 'Valid Combo',
        punches: [PunchType.LEFT_STRAIGHT]
      };
      const invalidCombo = {
        id: '',
        name: '',
        punches: []
      };

      localStorage.setItem(
        'combinations',
        JSON.stringify({
          state: { combinations: [validCombo, invalidCombo] },
          version: 1
        })
      );

      const loaded = storage.getItem('combinations');
      expect(loaded).toEqual({
        state: { combinations: [validCombo] },
        version: 1
      });
    });

    it('preserves empty combinations collection if user deleted all', () => {
      localStorage.setItem(
        'combinations',
        JSON.stringify({
          state: { combinations: [] },
          version: 1
        })
      );

      const loaded = storage.getItem('combinations');
      expect(loaded).toEqual({
        state: { combinations: [] },
        version: 1
      });
    });

    it('returns null if array contains only invalid/corrupt items to restore presets', () => {
      localStorage.setItem(
        'combinations',
        JSON.stringify({
          state: {
            combinations: [{ id: '', name: '', punches: [] }]
          },
          version: 1
        })
      );

      expect(storage.getItem('combinations')).toBeNull();
    });
  });
});
