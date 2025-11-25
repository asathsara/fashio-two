import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { CartItem as CartItemType } from '@/types/cart';
import { buildImageSrc, getImageUrl } from '@/utils/image';
import { SmartImage } from '@/components/common/SmartImage';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (itemId: string, size: string, quantity: number) => void;
    onRemove: (itemId: string, size: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {

    const imageUrl = getImageUrl(item.item, item.selectedImageIndex);

    const hasDiscount = item.discount > 0;
    const itemTotal = item.appliedPrice * item.quantity;
    const totalSavings = item.discount * item.quantity;
    const itemId = item.item._id || '';

    const handleIncrease = () => {
        if (item.quantity < item.item.stock) {
            onUpdateQuantity(itemId, item.size, item.quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (item.quantity > 1) {
            onUpdateQuantity(itemId, item.size, item.quantity - 1);
        }
    };

    return (
        <div className="flex gap-4 p-4 border rounded-lg bg-white relative">
            {hasDiscount && (
                <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white text-xs">
                    Save Rs. {totalSavings.toFixed(2)}
                </Badge>
            )}

            {/* Image */}
            <Link to={`/items/${item.item._id}`} className="flex-shrink-0 pt-4">
                <SmartImage
                    src={buildImageSrc(imageUrl)}
                    alt={item.item.name}
                    className="w-24 h-24"
                    rounded="rounded-md"
                />
            </Link>

            {/* Details */}
            <div className="flex-1 pt-4">
                <Link to={`/items/${item.item._id}`} className="hover:underline">
                    <h3 className="font-semibold text-lg">{item.item.name}</h3>
                </Link>
                <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>

                {hasDiscount ? (
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-red-600">
                            Rs. {item.appliedPrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                            Rs. {item.originalPrice.toFixed(2)}
                        </span>
                    </div>
                ) : (
                    <p className="text-sm text-gray-600">Price: Rs. {item.appliedPrice.toFixed(2)}</p>
                )}

                {/* Stock warning */}
                {item.quantity >= item.item.stock && (
                    <p className="text-sm text-red-600 mt-1">Max stock reached</p>
                )}
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-end justify-between">
                <button
                    onClick={() => onRemove(itemId, item.size)}
                    className="text-red-500 hover:text-red-700 p-1 pb-4"
                    aria-label="Remove item"
                >
                    <Trash2 size={18} />
                </button>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleDecrease}
                        disabled={item.quantity <= 1}
                    >
                        <Minus size={14} />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleIncrease}
                        disabled={item.quantity >= item.item.stock}
                    >
                        <Plus size={14} />
                    </Button>
                </div>

                <p className="font-semibold text-lg mt-2">Rs. {itemTotal.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartItem;
