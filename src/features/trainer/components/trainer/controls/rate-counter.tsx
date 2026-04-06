'use client';

import { ChangeEvent } from 'react';
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

export default function RateCounter() {
  const rate = useStoreAsync(useControlsStore, rateSelector);
  const isPlaying = useControlsStore(isPlayingSelector);

  const setRate = useControlsStore(setRateSelector);

  const isRateLoading = typeof rate === 'undefined';

  function handleRateInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (/\D/.test(event.target.value)) {
      return;
    }
    setRate(+event.target.value);
  }

  function handleRateInputBlur() {
    assertValue(rate, 'rate');
    if (rate < RATE_COUNTER_MIN_VALUE) {
      setRate(RATE_COUNTER_MIN_VALUE);
    }
  }

  function handleRateDecrementClick() {
    assertValue(rate, 'rate');
    setRate(rate - RATE_COUNTER_AMPLIFIER_VALUE);
  }

  function handleRateIncrementClick() {
    assertValue(rate, 'rate');
    setRate(rate + RATE_COUNTER_AMPLIFIER_VALUE);
  }

  return (
    <div className={styles.rateCounter}>
      <label>Rate:</label>
      <Button
        disabled={isPlaying || isRateLoading || rate <= RATE_COUNTER_MIN_VALUE}
        onClick={handleRateDecrementClick}
      >
        -{RATE_COUNTER_AMPLIFIER_VALUE}
      </Button>
      <Input
        value={rate ?? RATE_COUNTER_MIN_VALUE}
        disabled={isPlaying || isRateLoading}
        isLoading={isRateLoading}
        onChange={handleRateInputChange}
        onBlur={handleRateInputBlur}
      />
      <Button
        disabled={isPlaying || isRateLoading}
        onClick={handleRateIncrementClick}
      >
        +{RATE_COUNTER_AMPLIFIER_VALUE}
      </Button>
    </div>
  );
}
