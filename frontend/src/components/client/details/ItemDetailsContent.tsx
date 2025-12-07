import { Badge } from '@/components/ui/badge';
import type { Item } from '@/types/item';
import { ItemPricing } from './ItemPricing';
import { ItemStockBadge } from './ItemStockBadge';
import { SizeSelector } from './SizeSelector';
import { ItemDescription } from './ItemDescription';
import { AddToCartButton } from './AddToCartButton';
import { QuantityController } from '@/components/common/QuantityController';
import { useState } from 'react';

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
    onAddToCart: (quantity: number) => void;
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
    const [quantity, setQuantity] = useState(1);
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

            <div className="flex flex-col gap-4">
                {/* Quantity Controller */}
                {item.stock > 0 && (
                    <div className="flex items-center gap-4">
                        <span className="font-medium">Quantity:</span>
                        <QuantityController
                            quantity={quantity}
                            maxQuantity={item.stock}
                            onIncrease={() => setQuantity(q => Math.min(q + 1, item.stock))}
                            onDecrease={() => setQuantity(q => Math.max(q - 1, 1))}
                        />
                    </div>
                )}

                {/* Add to Cart */}
                <AddToCartButton
                    isOutOfStock={item.stock === 0}
                    needsSizeSelection={needsSizeSelection}
                    isLoading={cartLoading}
                    isAuthenticated={isAuthenticated}
                    onAddToCart={() => onAddToCart(quantity)}
                />
            </div>
        </div>
    );
};

export default ItemDetailsContent;
