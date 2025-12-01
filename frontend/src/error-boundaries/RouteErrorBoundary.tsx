import type { ReactNode } from "react";
import { ComponentErrorBoundary } from "./ComponentErrorBoundary";
import type {
    ComponentErrorBoundaryProps,
    ErrorBoundaryFallbackRender,
} from "./ComponentErrorBoundary";
import { RouteFallback } from "./fallback/RouteFallback";

interface RouteErrorBoundaryProps extends ComponentErrorBoundaryProps {
    routeName?: string;
    fallback?: ReactNode;
}

export const RouteErrorBoundary = ({
    routeName,
    fallback,
    fallbackRender,
    ...rest
}: RouteErrorBoundaryProps) => {
    const defaultFallbackRender: ErrorBoundaryFallbackRender | undefined =
        fallbackRender ??
        (!fallback
            ? ({ error, resetErrorBoundary }) => (
                <RouteFallback routeName={routeName} error={error} onRetry={resetErrorBoundary} />
            )
            : undefined);

    return (
        <ComponentErrorBoundary
            {...rest}
            name={rest.name ?? routeName ?? "RouteBoundary"}
            fallback={fallback}
            fallbackRender={defaultFallbackRender}
        />
    );
};
