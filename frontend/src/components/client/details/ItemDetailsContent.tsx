import { Badge } from '@/components/ui/badge';
import type { Item } from '@/types/item';
import { ItemPricing } from './ItemPricing';
import { ItemStockBadge } from './ItemStockBadge';
import { SizeSelector } from './SizeSelector';
import { ItemDescription } from './ItemDescription';
import { AddToCartButton } from './AddToCartButton';

interface ItemDetailsContentProps {
    item: Item;
    pricing: {
        hasPromo: boolean;
        appliedPrice: number;
        originalPrice: number;
    };
    selectedSize: string;
    onSizeSelect: (size: string) => void;
    isAuthenticated: boolean;
    cartLoading: boolean;
    onAddToCart: () => void;
}

export const ItemDetailsContent = ({
    item,
    pricing,
    selectedSize,
    onSizeSelect,
    isAuthenticated,
    cartLoading,
    onAddToCart
}: ItemDetailsContentProps) => {
    const needsSizeSelection = item.sizes.length > 0 && !selectedSize;

    return (
        <div className="space-y-6">
            {/* Category */}
            <Badge variant="secondary" className="text-sm">
                {item.category.name} - {item.category.subCategory?.name || 'N/A'}
            </Badge>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {item.name}
            </h1>

            {/* Pricing */}
            <ItemPricing
                hasPromo={pricing.hasPromo}
                appliedPrice={pricing.appliedPrice}
                originalPrice={pricing.originalPrice}
                regularPrice={item.price}
            />

            {/* Stock */}
            <ItemStockBadge stock={item.stock} />

            {/* Sizes */}
            <SizeSelector
                sizes={item.sizes}
                selectedSize={selectedSize}
                onSizeSelect={onSizeSelect}
            />

            {/* Description */}
            <ItemDescription description={item.description} />

            {/* Add to Cart */}
            <AddToCartButton
                isOutOfStock={item.stock === 0}
                needsSizeSelection={needsSizeSelection}
                isLoading={cartLoading}
                isAuthenticated={isAuthenticated}
                onAddToCart={onAddToCart}
            />
        </div>
    );
};

export default ItemDetailsContent;
