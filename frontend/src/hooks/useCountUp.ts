import { useEffect, useState } from 'react';

export const useCountUp = (value: number, duration = 800) => {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        let frame = 0;
        const totalFrames = Math.round(duration / 16);
        const increment = value / totalFrames;

        const timer = setInterval(() => {
            frame++;
            setDisplay(prev => {
                const next = prev + increment;
                return next >= value ? value : next;
            });
            if (frame >= totalFrames) clearInterval(timer);
        }, 16);

        return () => clearInterval(timer);
    }, [value, duration]);

    return display;
};
