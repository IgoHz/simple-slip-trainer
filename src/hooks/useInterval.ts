import { useEffect, useEffectEvent, useRef } from 'react';

export function useInterval(isRunning: boolean, onTick: () => void, delay?: number) {
  const timerId = useRef<NodeJS.Timeout | number | undefined>(undefined);

  const handleTick = useEffectEvent(() => {
    onTick();
  });

  useEffect(() => {
    if (isRunning) {
      timerId.current = setInterval(handleTick, delay);
    } else {
      clearInterval(timerId.current);
    }
  }, [isRunning, delay]);
}
