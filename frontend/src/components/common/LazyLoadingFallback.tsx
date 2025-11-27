import { Spinner } from "./Spinner";


// For full page loads (layouts, major routes)
export const PageLoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Spinner size="lg" fullHeight label="Loading..." />
    </div>
);

// For component loads within a page
export const ComponentLoadingFallback = () => (
    <div className="flex items-center justify-center p-8">
        <Spinner size="md" label="Loading..." />
    </div>
);

// For inline/small component loads
export const InlineLoadingFallback = () => (
    <div className="flex items-center justify-center p-4">
        <Spinner size="sm" />
    </div>
);

// For modal/dialog loads
export const ModalLoadingFallback = () => (
    <div className="flex items-center justify-center min-h-[200px]">
        <Spinner size="md" />
    </div>
);
