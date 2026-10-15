'use client';

import { useCallback, useState } from 'react';
import styles from './stopwatch.module.css';
import { useInterval, formatSecondsToTime } from '@/shared/lib';
import {
  isPlayingSelector,
  setIsPlayingSelector,
  useSessionStore
} from '@/entities/session';
import PlayPauseButton from './play-pause-button';
import StopButton from './stop-button';

export interface StopwatchProps {
  className?: string;
}

export default function Stopwatch({ className }: StopwatchProps) {
  const isPlaying = useSessionStore(isPlayingSelector);
  const setIsPlaying = useSessionStore(setIsPlayingSelector);

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
      <span>Time:</span>
      <div className={styles.time}>{formatSecondsToTime(time)}</div>
      <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPauseClick} />
      <StopButton disabled={isPlaying || !time} onClick={handleResetClick} />
    </div>
  );
}
