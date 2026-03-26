'use client';

import { ChangeEvent } from 'react';
import styles from './rate-counter.module.css';
import { useTrainerControlsState } from '@/store/trainer-controls/provider';
import { setRate } from '@/store/trainer-controls/actions';
import Input from '@/components/input';
import Button from '@/components/button';
import {
  RATE_COUNTER_AMPLIFIER_VALUE,
  RATE_COUNTER_MIN_VALUE
} from '@/features/trainer/config/rate';

export default function RateCounter() {
  const [state, dispatch] = useTrainerControlsState();
  const { rate, isPlaying } = state;

  function handleRateInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (/\D/.test(event.target.value)) {
      return;
    }
    dispatch(setRate(+event.target.value));
  }

  function handleRateInputBlur() {
    if (rate < RATE_COUNTER_MIN_VALUE) {
      dispatch(setRate(RATE_COUNTER_MIN_VALUE));
    }
  }

  function handleRateDecrementClick() {
    dispatch(setRate(rate - RATE_COUNTER_AMPLIFIER_VALUE));
  }

  function handleRateIncrementClick() {
    dispatch(setRate(rate + RATE_COUNTER_AMPLIFIER_VALUE));
  }

  return (
    <div className={styles.rateCounter}>
      <label>Rate:</label>
      <Button
        disabled={isPlaying || rate <= RATE_COUNTER_MIN_VALUE}
        onClick={handleRateDecrementClick}
      >
        -{RATE_COUNTER_AMPLIFIER_VALUE}
      </Button>
      <Input
        value={rate}
        disabled={isPlaying}
        onChange={handleRateInputChange}
        onBlur={handleRateInputBlur}
      />
      <Button disabled={isPlaying} onClick={handleRateIncrementClick}>
        +{RATE_COUNTER_AMPLIFIER_VALUE}
      </Button>
    </div>
  );
}
