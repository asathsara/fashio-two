import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/common/Spinner";

interface AsyncFallbackProps {
    error?: Error;
    isPending?: boolean;
    onRetry?: () => void;
    label?: string;
}

export const AsyncFallback = ({ error, isPending = false, onRetry, label }: AsyncFallbackProps) => {
    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <Spinner size="lg" label={label ?? "Loading resources"} />
                <p className="text-sm text-muted-foreground">
                    Preparing content, please hold on a moment.
                </p>
            </div>
        );
    }

    return (
        <div
            role="alert"
            aria-live="assertive"
            className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border/60 bg-background/80 px-6 py-10 text-center shadow-sm"
        >
            <p className="text-base font-semibold text-foreground">We could not load this content.</p>
            <p className="text-sm text-muted-foreground">
                {error?.message ?? "An unexpected async error occurred."}
            </p>
            {onRetry && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    aria-label={`Retry loading ${label ?? "content"}`}>
                    <RotateCcw className="size-4" aria-hidden="true" />
                    Retry
                </Button>
            )}
        </div>
    );
};
