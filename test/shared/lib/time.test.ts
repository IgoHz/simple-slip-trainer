import { formatSecondsToTime } from '@/shared/lib';

describe('formatSecondsToTime', () => {
  it('formats zero seconds', () => {
    expect(formatSecondsToTime(0)).toBe('00:00');
  });

  it('formats single digit minutes and seconds', () => {
    expect(formatSecondsToTime(65)).toBe('01:05');
  });

  it('formats double digit minutes and seconds', () => {
    expect(formatSecondsToTime(754)).toBe('12:34');
  });
});
