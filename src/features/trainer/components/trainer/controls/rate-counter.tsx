'use client';

import { type ChangeEvent } from 'react';
import styles from './rate-counter.module.css';
import { useTrainerControlsState } from '@/store/trainer-controls/provider';
import { setRate } from '@/store/trainer-controls/actions';
import Input from '@/components/input';

export default function RateCounter() {
  const [state, dispatch] = useTrainerControlsState();
  const { rate, isPlaying } = state;

  function handleRateChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setRate(+event.target.value));
  }

  return (
    <div className={styles.rateCounter}>
      Rate:&nbsp;
      <Input value={rate} disabled={isPlaying} onChange={handleRateChange} />
    </div>
  );
}
