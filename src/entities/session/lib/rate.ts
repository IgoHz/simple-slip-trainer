import { RATE_COUNTER_MIN_VALUE } from '../config/rate';

export function calcRateCoeficient(rate: number | undefined): number {
  return RATE_COUNTER_MIN_VALUE / (rate ?? RATE_COUNTER_MIN_VALUE);
}
