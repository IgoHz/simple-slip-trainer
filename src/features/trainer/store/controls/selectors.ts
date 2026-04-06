import { State } from './store';

export const rateSelector = (state: State) => state.rate;
export const isPlayingSelector = (state: State) => state.isPlaying;

export const setRateSelector = (state: State) => state.setRate;
export const setIsPlayingSelector = (state: State) => state.setIsPlaying;
