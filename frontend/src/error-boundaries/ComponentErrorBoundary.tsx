import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { ComponentFallback } from "./fallback/ComponentFallback";

export type ErrorBoundaryFallbackRender = (args: {
    error: Error;
    resetErrorBoundary: () => void;
}) => ReactNode;

export interface ComponentErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    fallbackRender?: ErrorBoundaryFallbackRender;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    onReset?: () => void;
    resetKeys?: Array<unknown>;
    name?: string;
}

interface ComponentErrorBoundaryState {
    hasError: boolean;
    error?: Error | null;
}

export class ComponentErrorBoundary extends Component<
    ComponentErrorBoundaryProps,
    ComponentErrorBoundaryState
> {
    state: ComponentErrorBoundaryState = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error: Error): ComponentErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const label = this.props.name ?? "ComponentErrorBoundary";
        console.error(`[${label}]`, error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    componentDidUpdate(prevProps: Readonly<ComponentErrorBoundaryProps>) {
        if (!this.state.hasError) return;
        if (this.haveResetKeysChanged(prevProps.resetKeys, this.props.resetKeys)) {
            this.resetErrorBoundary();
        }
    }

    private haveResetKeysChanged(
        prevKeys?: Array<unknown>,
        nextKeys?: Array<unknown>,
    ) {
        if (!prevKeys && !nextKeys) return false;
        if (!prevKeys || !nextKeys) return true;
        if (prevKeys.length !== nextKeys.length) return true;

        return nextKeys.some((key, index) => !Object.is(key, prevKeys[index]));
    }

    private resetErrorBoundary = () => {
        this.props.onReset?.();
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            const fallbackProps = {
                error: this.state.error ?? new Error("Unknown error"),
                resetErrorBoundary: this.resetErrorBoundary,
            };

            if (this.props.fallbackRender) {
                return this.props.fallbackRender(fallbackProps);
            }

            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <ComponentFallback
                    error={fallbackProps.error}
                    onRetry={this.resetErrorBoundary}
                    boundaryName={this.props.name}
                />
            );
        }

        return this.props.children;
    }
}
