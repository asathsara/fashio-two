import { useRef, useCallback, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void | Promise<void>>(callback: T, delay = 500) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const latestCallback = useRef(callback);

    useEffect(() => {
        latestCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    const debounced = useCallback((...args: Parameters<T>) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            latestCallback.current(...args);
        }, delay);
    }, [delay]);

    return debounced;
}
