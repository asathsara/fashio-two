import { Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RouteFallbackProps {
    routeName?: string;
    error?: Error;
    onRetry?: () => void;
}

export const RouteFallback = ({ routeName, error, onRetry }: RouteFallbackProps) => {
    const navigate = useNavigate();

    const handleNavigateHome = () => navigate("/");

    return (
        <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
            <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Route error</p>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    {routeName ? `${routeName} is currently unavailable` : "Something went wrong"}
                </h1>
                <p className="text-sm text-muted-foreground max-w-md">
                    {error?.message ?? "The page failed to render. Please try again or return to the dashboard."}
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                    type="button"
                    onClick={handleNavigateHome}>
                    <Home className="size-4" aria-hidden="true" />
                    Go home
                </Button>
                {onRetry && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onRetry}
                        aria-label={`Retry loading ${routeName ?? "page"}`}
                    >
                        <RefreshCw className="size-4" aria-hidden="true" />
                        Retry page
                    </Button>
                )}
            </div>
        </section>
    );
};
