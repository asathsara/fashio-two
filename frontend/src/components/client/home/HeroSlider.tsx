import { motion, AnimatePresence } from "framer-motion";
import { useImageCarousel } from "@/hooks/useImageCarousel";
import type { Image } from "@/types/image";

interface HeroSliderProps {
    images: Image[];
    interval?: number;
}

export function HeroSlider({ images, interval = 5000 }: HeroSliderProps) {
    const { currentImage, index } = useImageCarousel(images, interval);

    if (!images.length || !currentImage) return null;

    const imageSrc = `${import.meta.env.VITE_API_UPLOAD_IMAGES_URL}${currentImage._id}`;

    return (
        <div className="flex justify-center">
            {/* Preload all images to prevent repeated network requests */}
            <div className="hidden" aria-hidden="true">
                {images.map((img) => (
                    <img
                        key={img._id}
                        src={`${import.meta.env.VITE_API_UPLOAD_IMAGES_URL}${img._id}`}
                        alt="preload"
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.img
                    key={index}
                    src={imageSrc}
                    alt={currentImage.filename}
                    className="object-cover w-4/5 md:h-144 sm:min-h-72 min-w-4/5 rounded-2xl mt-8 shadow-sm"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1 }}
                />
            </AnimatePresence>
        </div>
    );
}
