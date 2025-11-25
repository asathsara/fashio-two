import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type SmartImageProps = {
    src: string;
    alt: string;
    className?: string;   // custom size classes like w-40 h-40 etc
    rounded?: string;     // rounded-xl, rounded-full
    showOverlay?: boolean; // show subtle overlay on load
};

export const SmartImage = ({
    src,
    alt,
    className = "",
    rounded = "rounded-xl",
    showOverlay = false,
}: SmartImageProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setLoading(false);
        setError(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <div className={`relative overflow-hidden bg-gray-100 ${className} ${rounded} group`}>
            {/* Skeleton Loader */}
            {loading && (
                <Skeleton className={`absolute inset-0 w-full h-full ${rounded}`} />
            )}

            {/* Error State */}
            {error && (
                <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${rounded}`}>
                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2 text-xs text-gray-500">Image not available</p>
                    </div>
                </div>
            )}

            {/* Image */}
            <img
                src={src}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${rounded} ${loading ? "opacity-0 scale-105" : "opacity-100 scale-100"
                    }`}
            />

            {/* Optional Hover Overlay */}
            {showOverlay && !loading && !error && (
                <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 ${rounded}`} />
            )}
        </div>
    );
};
