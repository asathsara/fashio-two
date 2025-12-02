import { Suspense, type ReactNode } from "react";
import { ComponentErrorBoundary } from "./ComponentErrorBoundary";
import type {
    ComponentErrorBoundaryProps,
    ErrorBoundaryFallbackRender,
} from "./ComponentErrorBoundary";
import { AsyncFallback } from "./fallback/AsyncFallback";

interface AsyncErrorBoundaryProps extends ComponentErrorBoundaryProps {
    suspenseFallback?: ReactNode;
    label?: string;
}

export const AsyncErrorBoundary = ({
    suspenseFallback,
    fallback,
    fallbackRender,
    label,
    children,
    ...rest
}: AsyncErrorBoundaryProps) => {
    const defaultFallbackRender: ErrorBoundaryFallbackRender | undefined =
        fallbackRender ??
        (!fallback
            ? ({ error, resetErrorBoundary }) => (
                <AsyncFallback error={error} onRetry={resetErrorBoundary} label={label} />
            )
            : undefined);

    return (
        <ComponentErrorBoundary
            {...rest}
            fallback={fallback}
            fallbackRender={defaultFallbackRender}
            name={rest.name ?? "AsyncBoundary"}
        >
            <Suspense fallback={suspenseFallback ?? <AsyncFallback isPending label={label} />}>
                {children}
            </Suspense>
        </ComponentErrorBoundary>
    );
};
