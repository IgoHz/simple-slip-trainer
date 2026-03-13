'use client'

import { useEffect, useRef, useState } from "react";
import styles from './stopwatch.module.css';
import { useTrainerControlsState } from "@/store/trainer-controls/provider";
import { setIsPlaying } from "@/store/trainer-controls/actions";

export default function Stopwatch() {
  const [state, dispatch] = useTrainerControlsState();
  const { isPlaying } = state;

  const [time, setTime] = useState(0);

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
    dispatch(setIsPlaying(!isPlaying));
  }

  function handleResetClick() {
    setTime(0);
  }

  return (
    <div className={styles.stopwatch}>
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