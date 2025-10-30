import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
    className?: string;
    compact?: boolean; // for inline vs full-page style
}

export const ErrorMessage = ({
    message = "Something went wrong. Please try again.",
    onRetry,
    className,
    compact = false,
}: ErrorMessageProps) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center",
                !compact && "min-h-[400px] bg-gradient-to-b from-gray-50 to-white py-16",
                className
            )}
        >
            <div className="bg-gray-100 p-4 rounded-full mb-4">
                <AlertCircle className="w-12 h-12 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-sm text-gray-600 max-w-md">{message}</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-6 px-6 py-2.5 text-sm font-semibold bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};
