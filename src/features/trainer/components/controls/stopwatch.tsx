'use client';

import { useCallback, useState } from 'react';
import styles from './stopwatch.module.css';
import { useInterval } from '@/hooks/useInterval';
import { formatSecondsToTime } from '@/utils/time';
import {
  isPlayingSelector,
  setIsPlayingSelector,
  useControlsStore
} from '@/features/trainer/store/controls';
import PlayPauseButton from './stopwatch/play-pause-button';
import StopButton from './stopwatch/stop-button';

interface Props {
  className?: string;
}

export default function Stopwatch({ className }: Props) {
  const isPlaying = useControlsStore(isPlayingSelector);

  const setIsPlaying = useControlsStore(setIsPlayingSelector);

  const [time, setTime] = useState(0);

  const handleInterval = () => {
    setTime((prevTime) => prevTime + 1);
  };

  useInterval(isPlaying, handleInterval, 1000);

  const handlePlayPauseClick = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  const handleResetClick = useCallback(() => {
    setTime(0);
  }, []);

  return (
    <div className={`${styles.stopwatch} ${className ?? ''}`}>
      <label>Time:</label>
      <div className={styles.time}>{formatSecondsToTime(time)}</div>
      <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPauseClick} />
      <StopButton disabled={isPlaying || !time} onClick={handleResetClick} />
    </div>
  );
}
