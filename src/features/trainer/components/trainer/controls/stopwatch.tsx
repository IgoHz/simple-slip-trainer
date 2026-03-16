'use client';

import { useState } from 'react';
import styles from './stopwatch.module.css';
import { useTrainerControlsState } from '@/store/trainer-controls/provider';
import { setIsPlaying } from '@/store/trainer-controls/actions';
import { useInterval } from '@/hooks/useInterval';

export default function Stopwatch() {
  const [state, dispatch] = useTrainerControlsState();
  const { isPlaying } = state;

  const [time, setTime] = useState(0);

  const intervalCallback = () => {
    setTime((prevTime) => prevTime + 1);
  };

  useInterval(isPlaying, intervalCallback, 1000);

  let label = 'Play';
  if (isPlaying) {
    label = 'Pause';
  }

  function handlePlayClick() {
    dispatch(setIsPlaying(!isPlaying));
  }

  function handleResetClick() {
    setTime(0);
  }

  return (
    <div className={styles.stopwatch}>
      <div>{time}</div>
      <button onClick={handlePlayClick}>{label}</button>
      <button disabled={isPlaying || !time} onClick={handleResetClick}>
        Reset
      </button>
    </div>
  );
}
