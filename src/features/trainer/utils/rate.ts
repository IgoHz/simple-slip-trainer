import { RATE_COUNTER_MIN_VALUE } from '../config/rate';

export function calcRateCoeficient(rate: number): number {
  return RATE_COUNTER_MIN_VALUE / rate;
}
