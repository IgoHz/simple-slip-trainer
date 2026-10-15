'use client';

import { ChangeEvent, useCallback } from 'react';
import styles from './rate-counter.module.css';
import { Button, Input } from '@/shared/ui';
import { assertValue, useStoreAsync } from '@/shared/lib';
import {
  RATE_COUNTER_AMPLIFIER_VALUE,
  RATE_COUNTER_MIN_VALUE,
  isPlayingSelector,
  rateSelector,
  setRateSelector,
  useSessionStore
} from '@/entities/session';

export interface RateCounterProps {
  className?: string;
}

export default function RateCounter({ className }: RateCounterProps) {
  const rate = useStoreAsync(useSessionStore, rateSelector);
  const isPlaying = useSessionStore(isPlayingSelector);

  const setRate = useSessionStore(setRateSelector);

  const isRateLoading = typeof rate === 'undefined';

  const handleRateInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (/\D/.test(event.target.value)) {
        return;
      }
      setRate(+event.target.value);
    },
    [setRate]
  );

  const handleRateInputBlur = useCallback(() => {
    assertValue(rate, 'rate');
    if (rate < RATE_COUNTER_MIN_VALUE) {
      setRate(RATE_COUNTER_MIN_VALUE);
    }
  }, [rate, setRate]);

  const handleRateDecrementClick = useCallback(() => {
    assertValue(rate, 'rate');
    setRate(rate - RATE_COUNTER_AMPLIFIER_VALUE);
  }, [rate, setRate]);

  const handleRateIncrementClick = useCallback(() => {
    assertValue(rate, 'rate');
    setRate(rate + RATE_COUNTER_AMPLIFIER_VALUE);
  }, [rate, setRate]);

  return (
    <div className={`${styles.rateCounter} ${className ?? ''}`}>
      <span>Rate:</span>
      <Button
        label={`-${RATE_COUNTER_AMPLIFIER_VALUE}`}
        disabled={isPlaying || isRateLoading || rate <= RATE_COUNTER_MIN_VALUE}
        onClick={handleRateDecrementClick}
      />
      <Input
        aria-label="Rate counter input"
        min={RATE_COUNTER_MIN_VALUE}
        value={rate ?? RATE_COUNTER_MIN_VALUE}
        disabled={isPlaying || isRateLoading}
        isLoading={isRateLoading}
        onChange={handleRateInputChange}
        onBlur={handleRateInputBlur}
      />
      <Button
        label={`+${RATE_COUNTER_AMPLIFIER_VALUE}`}
        disabled={isPlaying || isRateLoading}
        onClick={handleRateIncrementClick}
      />
    </div>
  );
}
