import React from "react";
import { cn } from "@/lib/utils";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
  label?: string;
  variant?: "bars" | "dots";
  fullHeight?: boolean;
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "bg-gray-900",
  className,
  label = "Loading...",
  variant = "bars",
  fullHeight = false,
}) => {


  // Bar spinner sizes
  const barSizeMap = {
    sm: { height: "h-4", width: "w-1", gap: "gap-1" },
    md: { height: "h-8", width: "w-1.5", gap: "gap-1.5" },
    lg: { height: "h-12", width: "w-2", gap: "gap-2" },
  };

  // Dots spinner sizes
  const dotsSizeMap = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  // WAVEFORM (Bars) variant
  if (variant === "bars") {
    const { height, width, gap } = barSizeMap[size];

    return (
      <div className={cn("flex items-center justify-center", fullHeight && "min-h-screen")}>
        <div className="flex flex-col items-center justify-center gap-3" role="status">
          <div className={cn("flex items-end justify-center", gap, className)}>
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={cn(
                  width,
                  height,
                  color,
                  "rounded-full animate-[wave_1s_ease-in-out_infinite]"
                )}
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              />
            ))}
          </div>
          {label && (
            <span className="text-sm text-gray-600 font-medium animate-pulse">
              {label}
            </span>
          )}

          {/* Keyframes for waveform animation */}
          <style>{`
          @keyframes wave {
            0%, 100% { transform: scaleY(0.4); opacity: 0.6; }
            50% { transform: scaleY(1); opacity: 1; }
          }
        `}</style>
        </div>
      </div>
    );
  }



  // Dots variant
  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center", fullHeight && "min-h-screen")}>
        <div className="flex flex-col items-center justify-center gap-3" role="status">
          <div className={cn("flex items-center gap-2", className)}>
            <div
              className={cn(
                dotsSizeMap[size],
                color,
                "rounded-full animate-[bounce_1s_ease-in-out_infinite]"
              )}
              style={{ animationDelay: "0ms" }}
            />
            <div
              className={cn(
                dotsSizeMap[size],
                color,
                "rounded-full animate-[bounce_1s_ease-in-out_infinite]"
              )}
              style={{ animationDelay: "150ms" }}
            />
            <div
              className={cn(
                dotsSizeMap[size],
                color,
                "rounded-full animate-[bounce_1s_ease-in-out_infinite]"
              )}
              style={{ animationDelay: "300ms" }}
            />
          </div>
          {label && (
            <span className="text-sm text-gray-600 font-medium animate-pulse">
              {label}
            </span>
          )}
        </div>
      </div>
    );
  }


};
