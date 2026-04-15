'use client';

import { ChangeEvent, useCallback } from 'react';
import styles from './rate-counter.module.css';
import Input from '@/components/input';
import Button from '@/components/button';
import {
  RATE_COUNTER_AMPLIFIER_VALUE,
  RATE_COUNTER_MIN_VALUE
} from '@/features/trainer/config/rate';
import {
  isPlayingSelector,
  rateSelector,
  setRateSelector,
  useControlsStore
} from '@/features/trainer/store/controls';
import useStoreAsync from '@/hooks/useStore';
import { assertValue } from '@/utils/assert';

interface Props {
  className?: string;
}

export default function RateCounter({ className }: Props) {
  const rate = useStoreAsync(useControlsStore, rateSelector);
  const isPlaying = useControlsStore(isPlayingSelector);

  const setRate = useControlsStore(setRateSelector);

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
      <label>Rate:</label>
      <Button
        label={`-${RATE_COUNTER_AMPLIFIER_VALUE}`}
        disabled={isPlaying || isRateLoading || rate <= RATE_COUNTER_MIN_VALUE}
        onClick={handleRateDecrementClick}
      />
      <Input
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
