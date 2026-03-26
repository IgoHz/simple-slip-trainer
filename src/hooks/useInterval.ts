import { useEffect, useEffectEvent, useRef } from 'react';

export function useInterval(isRunning: boolean, onInterval: () => void, delay?: number) {
  const timerId = useRef<NodeJS.Timeout | number | undefined>(undefined);

  const handleInterval = useEffectEvent(() => {
    onInterval();
  });

  useEffect(() => {
    if (isRunning) {
      timerId.current = setInterval(handleInterval, delay);
    } else {
      clearInterval(timerId.current);
    }
  }, [isRunning, delay]);
}
