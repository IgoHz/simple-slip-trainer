'use client'

import { type ChangeEvent, useState } from "react";
import styles from './rate-counter.module.css';

const DEFAULT_RATE = 60;

export default function RateCounter() {
  const [rate, setRate] = useState(DEFAULT_RATE);

  function handleRateChange(event: ChangeEvent<HTMLInputElement>) {
    setRate(+event.target.value);
  }

  return (
    <div className={styles.rateCounter}>
      Rate: <input value={rate} onChange={handleRateChange} />
    </div>
  );
}