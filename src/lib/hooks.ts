import { useEffect, useRef } from 'react';

export function useInterval(isRunning: boolean, callback: () => void, delay?: number) {
  const timerId = useRef<NodeJS.Timeout | number | undefined>(undefined);

  useEffect(() => {
    if (isRunning) {
      timerId.current = setInterval(callback, delay);
    } else {
      clearInterval(timerId.current);
    }
  }, [isRunning, callback, delay]);
}
