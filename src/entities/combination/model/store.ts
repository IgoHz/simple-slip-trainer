import { create } from 'zustand';
import {
  devtools,
  persist,
  PersistStorage,
  StorageValue
} from 'zustand/middleware';
import { PRESET_COMBINATIONS } from '../config/combinations';
import { validateCombination } from '../lib/sequence-selector';
import { CombinationState, PunchCombination } from './types';

export interface CombinationPersistedState {
  combinations: PunchCombination[];
}

export function generateCombinationId(): string {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }
  return `combo-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function createCombinationStorage(): PersistStorage<CombinationPersistedState> {
  return {
    getItem: (name: string): StorageValue<CombinationPersistedState> | null => {
      try {
        if (typeof window === 'undefined' || !window.localStorage) {
          return null;
        }
        const raw = window.localStorage.getItem(name);
        if (!raw) {
          return null;
        }
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') {
          return null;
        }
        const state = (parsed as { state?: unknown }).state;
        if (!state || typeof state !== 'object') {
          return null;
        }
        const combos = (state as { combinations?: unknown }).combinations;
        if (!Array.isArray(combos)) {
          return null;
        }
        const validCombos = combos.filter(validateCombination);
        if (combos.length > 0 && validCombos.length === 0) {
          return null;
        }
        return {
          state: {
            combinations: validCombos
          },
          version: (parsed as { version?: number }).version
        };
      } catch {
        return null;
      }
    },
    setItem: (
      name: string,
      value: StorageValue<CombinationPersistedState>
    ): void => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(name, JSON.stringify(value));
        }
      } catch {
        // Ignore quota or security errors gracefully
      }
    },
    removeItem: (name: string): void => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(name);
        }
      } catch {
        // Ignore errors gracefully
      }
    }
  };
}

export const useCombinationStore = create<CombinationState>()(
  devtools(
    persist(
      (set) => ({
        combinations: [...PRESET_COMBINATIONS],
        addCombination: (combo) => {
          const newCombo: PunchCombination = {
            id:
              combo.id && combo.id.trim()
                ? combo.id.trim()
                : generateCombinationId(),
            name: combo.name.trim(),
            punches: [...combo.punches],
            ...(combo.description ? { description: combo.description } : {}),
            ...(combo.intervalMs !== undefined
              ? { intervalMs: combo.intervalMs }
              : {})
          };
          set(
            (state) => ({
              combinations: [...state.combinations, newCombo]
            }),
            undefined,
            'combinations/add'
          );
          return newCombo;
        },
        updateCombination: (id, updates) =>
          set(
            (state) => ({
              combinations: state.combinations.map((c) =>
                c.id === id
                  ? {
                      ...c,
                      ...updates,
                      name:
                        updates.name !== undefined
                          ? updates.name.trim()
                          : c.name,
                      punches:
                        updates.punches !== undefined
                          ? [...updates.punches]
                          : c.punches
                    }
                  : c
              )
            }),
            undefined,
            'combinations/update'
          ),
        deleteCombination: (id) =>
          set(
            (state) => ({
              combinations: state.combinations.filter((c) => c.id !== id)
            }),
            undefined,
            'combinations/delete'
          ),
        resetToDefaults: () =>
          set(
            { combinations: [...PRESET_COMBINATIONS] },
            undefined,
            'combinations/reset-defaults'
          ),
        setCombinations: (combinations) =>
          set({ combinations }, undefined, 'combinations/set')
      }),
      {
        name: 'combinations',
        version: 1,
        storage: createCombinationStorage(),
        partialize: (state) => ({
          combinations: state.combinations
        })
      }
    )
  )
);

export default useCombinationStore;
