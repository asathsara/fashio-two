import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '@/components/common/Spinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useItemDetails } from '@/hooks/useItemDetails';
import { lazy, Suspense } from 'react';
import { ComponentLoadingFallback } from '@/components/common/LazyLoadingFallback';
import { ComponentErrorBoundary, ComponentFallback } from '@/error-boundaries';

// Lazy load heavy detail components
const ItemImageGallery = lazy(() => import('@/components/client/details/ItemImageGallery'))
const ItemDetailsContent = lazy(() => import('@/components/client/details/ItemDetailsContent'))

const ItemDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        item,
        isLoading,
        error,
        selectedSize,
        setSelectedSize,
        selectedImageIndex,
        setSelectedImageIndex,
        handleAddToCart,
        cartLoading,
        isAuthenticated,
        pricing,
    } = useItemDetails(id);

    if (isLoading) {
        return <Spinner fullHeight />;
    }

    const isItemRemoved = axios.isAxiosError(error) && error.response?.status === 404;

    if (isItemRemoved) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorMessage message="This item is no longer available." />
                <p className="mt-2 text-muted-foreground">
                    It may have been removed from the catalog, but any past orders remain accessible.
                </p>
                <Button onClick={() => navigate('/')} className="mt-4">
                    Back to shopping
                </Button>
            </div>
        );
    }

    if (error || !item || !pricing) {
        return (
            <div className="container mx-auto px-4 py-8">
                <ErrorMessage message="Failed to load item details" />
                <Button onClick={() => navigate(-1)} className="mt-4">
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2"
            >
                <ArrowLeft size={20} />
                Back
            </Button>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery */}
                <ComponentErrorBoundary
                    name="ItemImageGallery"
                    fallbackRender={({ error, resetErrorBoundary }) => (
                        <ComponentFallback
                            boundaryName="Image Gallery"
                            error={error}
                            onRetry={resetErrorBoundary}
                            compact
                        />
                    )}
                >
                    <Suspense fallback={<ComponentLoadingFallback />}>
                        <ItemImageGallery
                            item={item}
                            selectedImageIndex={selectedImageIndex}
                            onImageSelect={setSelectedImageIndex}
                            discountPercentage={pricing.discountPercentage}
                        />
                    </Suspense>
                </ComponentErrorBoundary>

                {/* Details Content */}
                <ComponentErrorBoundary
                    name="ItemDetailsContent"
                    fallbackRender={({ error, resetErrorBoundary }) => (
                        <ComponentFallback
                            boundaryName="Item Details"
                            error={error}
                            onRetry={resetErrorBoundary}
                            compact
                        />
                    )}
                >
                    <Suspense fallback={<ComponentLoadingFallback />}>
                        <ItemDetailsContent
                            item={item}
                            pricing={pricing}
                            selectedSize={selectedSize}
                            onSizeSelect={setSelectedSize}
                            isAuthenticated={isAuthenticated}
                            cartLoading={cartLoading}
                            onAddToCart={handleAddToCart}
                        />
                    </Suspense>
                </ComponentErrorBoundary>
            </div>
        </div>
    );
};

export default ItemDetailPage;
