import { useEffect, useState } from "react";

export const useImageCarousel = <T extends { url?: string }>(
  images: T[], // Array of images of generic type T
  delay: number = 5000 // Delay in milliseconds (default is 5000ms)
) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => clearInterval(interval);
  }, [images.length, delay]);

  return {
    currentImage: images[index],
    index,
    setIndex,
  };
};
