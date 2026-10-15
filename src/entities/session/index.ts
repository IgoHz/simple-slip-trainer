export {
  useSessionStore,
  useControlsStore,
  default as sessionStore
} from './model/store';

export {
  rateSelector,
  isPlayingSelector,
  setRateSelector,
  setIsPlayingSelector
} from './model/selectors';

export type { SessionState, State } from './model/types';

export {
  RATE_COUNTER_MIN_VALUE,
  RATE_COUNTER_AMPLIFIER_VALUE
} from './config/rate';

export { calcRateCoeficient } from './lib/rate';
