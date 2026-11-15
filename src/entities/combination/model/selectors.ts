import { CombinationState } from './types';

export const combinationsSelector = (state: CombinationState) =>
  state.combinations;

export const addCombinationSelector = (state: CombinationState) =>
  state.addCombination;

export const updateCombinationSelector = (state: CombinationState) =>
  state.updateCombination;

export const deleteCombinationSelector = (state: CombinationState) =>
  state.deleteCombination;

export const resetToDefaultsSelector = (state: CombinationState) =>
  state.resetToDefaults;

export const setCombinationsSelector = (state: CombinationState) =>
  state.setCombinations;
