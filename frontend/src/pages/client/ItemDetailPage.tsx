import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/common/Spinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ItemImageGallery } from '@/components/client/details/ItemImageGallery';
import { ItemDetailsContent } from '@/components/client/details/ItemDetailsContent';
import { useItemDetails } from '@/hooks/useItemDetails';

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
                <ItemImageGallery
                    item={item}
                    selectedImageIndex={selectedImageIndex}
                    onImageSelect={setSelectedImageIndex}
                    discountPercentage={pricing.discountPercentage}
                />

                {/* Details Content */}
                <ItemDetailsContent
                    item={item}
                    pricing={pricing}
                    selectedSize={selectedSize}
                    onSizeSelect={setSelectedSize}
                    isAuthenticated={isAuthenticated}
                    cartLoading={cartLoading}
                    onAddToCart={handleAddToCart}
                />
            </div>
        </div>
    );
};

export default ItemDetailPage;
