import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
    isOutOfStock: boolean;
    needsSizeSelection: boolean;
    isLoading: boolean;
    isAuthenticated: boolean;
    onAddToCart: () => void;
}

export const AddToCartButton = ({
    isOutOfStock,
    needsSizeSelection,
    isLoading,
    isAuthenticated,
    onAddToCart
}: AddToCartButtonProps) => {
    const isDisabled = isOutOfStock || needsSizeSelection || isLoading;

    return (
        <div className="pt-4">
            <Button
                size="lg"
                className="w-full md:w-auto flex items-center gap-2"
                disabled={isDisabled}
                onClick={onAddToCart}
            >
                <ShoppingCart size={20} />
                {isLoading ? 'Adding...' : 'Add to Cart'}
            </Button>

            {needsSizeSelection && (
                <p className="text-sm text-gray-500 mt-2">
                    Please select a size
                </p>
            )}

            {!isAuthenticated && (
                <p className="text-sm text-gray-500 mt-2">
                    Please login to add items to cart
                </p>
            )}
        </div>
    );
};

export default AddToCartButton;
