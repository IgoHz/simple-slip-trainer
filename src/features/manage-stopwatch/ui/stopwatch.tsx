'use client';

import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { useInterval, formatSecondsToTime } from '@/shared/lib';
import {
  isPlayingSelector,
  resetSessionSelector,
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
  const resetSession = useSessionStore(resetSessionSelector);

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
    if (typeof resetSession === 'function') {
      resetSession();
    }
  }, [resetSession]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'gap-[var(--padding-normal)]',
        'md:justify-start',
        className
      )}
    >
      <span>Time:</span>
      <div className="inline w-[3.375rem]">{formatSecondsToTime(time)}</div>
      <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPauseClick} />
      <StopButton disabled={isPlaying || !time} onClick={handleResetClick} />
    </div>
  );
}
