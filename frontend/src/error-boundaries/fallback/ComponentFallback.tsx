import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComponentFallbackProps {
    error?: Error;
    onRetry?: () => void;
    boundaryName?: string;
    compact?: boolean;
}

export const ComponentFallback = ({ error, onRetry, boundaryName, compact = false }: ComponentFallbackProps) => {
    // Compact mode for inline/small components
    if (compact) {
        return (
            <div
                role="alert"
                aria-live="assertive"
                className="flex flex-col gap-3 rounded-lg border border-border/60 bg-background/80 p-4 text-sm shadow-sm"
            >
                <div className="flex items-center gap-2 text-left">
                    <AlertTriangle className="size-4 text-amber-500" aria-hidden="true" />
                    <span className="text-sm font-semibold text-foreground">
                        {boundaryName ? `${boundaryName} ` : "Component "}failed to load
                    </span>
                </div>

                {onRetry && (
                    <Button type="button" variant="outline" size="sm" onClick={onRetry} className="w-full">
                        <RotateCcw className="size-3" aria-hidden="true" />
                        Retry
                    </Button>
                )}
            </div>
        );
    }

    // Full mode for major sections
    return (
        <div
            role="alert"
            aria-live="assertive"
            className="flex flex-col gap-4 rounded-xl border border-border/60 bg-background/80 p-6 text-sm shadow-sm"
        >
            <div className="flex items-center gap-3 text-left">
                <AlertTriangle className="size-5 text-amber-500" aria-hidden="true" />
                <div className="flex flex-col">
                    <span className="text-base font-semibold text-foreground">
                        Something went wrong{boundaryName ? ` in ${boundaryName}` : ""}.
                    </span>
                    <span className="text-muted-foreground">
                        {error?.message ?? "An unexpected error occurred."}
                    </span>
                </div>
            </div>

            {onRetry && (
                <div className="flex flex-wrap gap-3">
                    <Button type="button" variant="outline" size="sm" onClick={onRetry}
                    aria-label={`Retry loading ${boundaryName ?? "content"}`}>
                        <RotateCcw className="size-4" aria-hidden="true" />
                        Try again
                    </Button>
                </div>
            )}
        </div>
    );
};
