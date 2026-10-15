import { SessionState } from './types';

export const rateSelector = (state: SessionState) => state.rate;
export const isPlayingSelector = (state: SessionState) => state.isPlaying;

export const setRateSelector = (state: SessionState) => state.setRate;
export const setIsPlayingSelector = (state: SessionState) => state.setIsPlaying;
