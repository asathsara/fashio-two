import { useRef, useCallback, useEffect } from 'react';

export function useDebounce<Args extends unknown[]>(
  callback: (...args: Args) => void | Promise<void>,
  delay = 500
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestCallback = useRef(callback);

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const debounced = useCallback((...args: Args) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      latestCallback.current(...args);
    }, delay);
  }, [delay]);

  return debounced;
}
