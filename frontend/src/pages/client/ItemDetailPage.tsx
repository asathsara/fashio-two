import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/common/Spinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useItemDetails } from '@/hooks/useItemDetails';
import { lazy, Suspense } from 'react';
import { ComponentLoadingFallback } from '@/components/common/LazyLoadingFallback';

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
                <Suspense fallback={<ComponentLoadingFallback />}>
                    <ItemImageGallery
                        item={item}
                        selectedImageIndex={selectedImageIndex}
                        onImageSelect={setSelectedImageIndex}
                        discountPercentage={pricing.discountPercentage}
                    />
                </Suspense>

                {/* Details Content */}
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
            </div>
        </div>
    );
};

export default ItemDetailPage;
