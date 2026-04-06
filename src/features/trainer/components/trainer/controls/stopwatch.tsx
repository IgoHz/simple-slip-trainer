'use client';

import { useState } from 'react';
import styles from './stopwatch.module.css';
import { useInterval } from '@/hooks/useInterval';
import Button from '@/components/button';
import PlayIcon from './stopwatch/play-icon';
import PauseIcon from './stopwatch/pause-icon';
import StopIcon from './stopwatch/stop-icon';
import { formatSecondsToTime } from '@/utils/time';
import {
  isPlayingSelector,
  setIsPlayingSelector,
  useControlsStore
} from '@/features/trainer/store/controls';

export default function Stopwatch() {
  const isPlaying = useControlsStore(isPlayingSelector);

  const setIsPlaying = useControlsStore(setIsPlayingSelector);

  const [time, setTime] = useState(0);

  const handleInterval = () => {
    setTime((prevTime) => prevTime + 1);
  };

  useInterval(isPlaying, handleInterval, 1000);

  function handlePlayClick() {
    setIsPlaying(!isPlaying);
  }

  function handleResetClick() {
    setTime(0);
  }

  return (
    <div className={styles.stopwatch}>
      <label>Time:</label>
      <div className={styles.time}>{formatSecondsToTime(time)}</div>
      <Button onClick={handlePlayClick}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <Button disabled={isPlaying || !time} onClick={handleResetClick}>
        <StopIcon />
      </Button>
    </div>
  );
}
