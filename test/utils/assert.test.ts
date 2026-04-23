import { assertValue } from '@/utils/assert';

describe('assertValue', () => {
  it('does not throw for defined values', () => {
    expect(() => assertValue(5)).not.toThrow();
    expect(() => assertValue('test')).not.toThrow();
    expect(() => assertValue(false)).not.toThrow();
    expect(() => assertValue([])).not.toThrow();
  });

  it('throws for undefined', () => {
    expect(() => assertValue(undefined)).toThrow('Value is not defined!');
  });

  it('throws for null', () => {
    expect(() => assertValue(null)).toThrow('Value is not defined!');
  });

  it('throws with custom key', () => {
    expect(() => assertValue(undefined, 'rate')).toThrow(
      'rate is not defined!'
    );
  });
});
