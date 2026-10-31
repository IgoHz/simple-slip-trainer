import { SessionState } from './types';

export const rateSelector = (state: SessionState) => state.rate;
export const isPlayingSelector = (state: SessionState) => state.isPlaying;
export const modeSelector = (state: SessionState) => state.mode;
export const resetCountSelector = (state: SessionState) => state.resetCount;

export const setRateSelector = (state: SessionState) => state.setRate;
export const setIsPlayingSelector = (state: SessionState) => state.setIsPlaying;
export const setModeSelector = (state: SessionState) => state.setMode;
export const resetSessionSelector = (state: SessionState) => state.resetSession;
