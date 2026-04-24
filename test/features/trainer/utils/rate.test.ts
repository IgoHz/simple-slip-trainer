import { calcRateCoeficient } from '../../../../src/features/trainer/utils/rate';
import { RATE_COUNTER_MIN_VALUE } from '../../../../src/features/trainer/config/rate';

describe('calcRateCoeficient', () => {
  it('returns 1 when rate is undefined', () => {
    expect(calcRateCoeficient(undefined)).toBe(1);
  });

  it('returns 1 when rate is RATE_COUNTER_MIN_VALUE', () => {
    expect(calcRateCoeficient(RATE_COUNTER_MIN_VALUE)).toBe(1);
  });

  it('calculates correct coefficient for other rates', () => {
    expect(calcRateCoeficient(RATE_COUNTER_MIN_VALUE * 2)).toBe(0.5);
    expect(calcRateCoeficient(RATE_COUNTER_MIN_VALUE / 2)).toBe(2);
  });
});
