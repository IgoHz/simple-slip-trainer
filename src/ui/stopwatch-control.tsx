'use client'

import { useEffect, useRef, useState } from "react";
import styles from './stopwatch-control.module.css';

export default function StopwatchControl() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const timerId = useRef<NodeJS.Timeout | number | undefined>(undefined);
  
  useEffect(() => {
    if (isPlaying) {
      timerId.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerId.current);
    }
  }, [isPlaying]);

  let label = 'Play';
  if (isPlaying) {
    label = 'Pause';
  }

  function handlePlayClick() {
    setIsPlaying(!isPlaying);
  }

  function handleResetClick() {
    setTime(0);
  }

  return (
    <div className={styles.stopwatchControl}>
      <div>
        {time}
      </div>
      <button onClick={handlePlayClick}>
        {label}
      </button>
      <button
       disabled={isPlaying || !time}
       onClick={handleResetClick}>
        Reset
      </button>
    </div>
  );
}