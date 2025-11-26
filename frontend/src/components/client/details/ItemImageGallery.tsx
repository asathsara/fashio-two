import { Badge } from '@/components/ui/badge';
import { SmartImage } from '@/components/common/SmartImage';
import { buildImageSrc, getImageUrl } from '@/utils/image';
import type { Item } from '@/types/item';
import type { Image } from '@/types/image';

interface ItemImageGalleryProps {
    item: Item;
    selectedImageIndex: number;
    onImageSelect: (index: number) => void;
    discountPercentage?: string;
}

export const ItemImageGallery = ({
    item,
    selectedImageIndex,
    onImageSelect,
    discountPercentage
}: ItemImageGalleryProps) => {
    const imageUrl = buildImageSrc(getImageUrl(item, selectedImageIndex));
    const hasMultipleImages = item.images && item.images.length > 1;

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden border relative">
                {discountPercentage && (
                    <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white z-2">
                        -{discountPercentage}%
                    </Badge>
                )}

                <SmartImage
                    src={imageUrl}
                    alt={item.name}
                    className="w-full aspect-square"
                    rounded="rounded-lg"
                />
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && (
                <div className="flex gap-2 overflow-x-auto">
                    {item.images!.map((_image: Image, index: number) => (
                        <button
                            key={index}
                            onClick={() => onImageSelect(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${selectedImageIndex === index
                                    ? 'border-gray-600'
                                    : 'border-gray-200 hover:border-gray-400'
                                }`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <SmartImage
                                src={buildImageSrc(getImageUrl(item, index))}
                                alt={`${item.name} thumbnail ${index + 1}`}
                                className="w-20 h-20"
                                rounded='rounded-sm'
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItemImageGallery;
