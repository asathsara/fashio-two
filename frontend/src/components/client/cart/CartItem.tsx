import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { CartItem as CartItemType } from '@/types/cart';
import { buildImageSrc, getImageUrl } from '@/utils/image';
import { SmartImage } from '@/components/common/SmartImage';
import { QuantityController } from '@/components/common/QuantityController';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (itemId: string, size: string, quantity: number) => void;
    onRemove: (itemId: string, size: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<CartItemType | null>(null);
    const imageUrl = getImageUrl(item.item, item.selectedImageIndex);

    const hasDiscount = item.discount > 0;
    const itemTotal = item.appliedPrice * item.quantity;
    const totalSavings = item.discount * item.quantity;
    const itemId = item.item._id || "";

    const [localQuantity, setLocalQuantity] = useState(item.quantity);

    useEffect(() => {
        setLocalQuantity(item.quantity);
    }, [item.quantity]);

    const debouncedUpdate = useDebounce(async (quantity: number) => {
        try {
            await onUpdateQuantity(itemId, item.size, quantity);
        } catch (error) {
            setLocalQuantity(item.quantity); // rollback on error
            console.error(error);
        }
    }, 400);

    const handleIncrease = () => {
        if (localQuantity < item.item.stock) {
            const newQuantity = localQuantity + 1;
            setLocalQuantity(newQuantity);
            debouncedUpdate(newQuantity);
        }
    };

    const handleDecrease = () => {
        if (localQuantity > 1) {
            const newQuantity = localQuantity - 1;
            setLocalQuantity(newQuantity);
            debouncedUpdate(newQuantity);
        }
    };

    return (
        <div className="flex gap-4 p-4 border rounded-lg bg-white">

            {/* LEFT COLUMN: Trash button + Image */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0 mt-2">

                <Link to={`/items/${item.item._id}`}>
                    <SmartImage
                        src={buildImageSrc(imageUrl)}
                        alt={item.item.name}
                        className="w-24 h-24"
                        rounded="rounded-md"
                    />
                </Link>
            </div>

            {/* MIDDLE: Item info */}
            <div className="flex-1 min-w-0 mt-2">
                <Link to={`/items/${item.item._id}`} className="hover:underline">
                    <h3 className="font-semibold text-lg truncate">{item.item.name}</h3>
                </Link>

                <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>

                {hasDiscount ? (
                    <div className="space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-red-600 my-1">
                                Rs. {item.appliedPrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                                Rs. {item.originalPrice.toFixed(2)}
                            </span>
                        </div>

                        <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs w-fit">
                            Save Rs. {totalSavings.toFixed(2)}
                        </Badge>
                    </div>
                ) : (
                    <p className="text-sm text-gray-700 mt-2">
                        Rs. {item.appliedPrice.toFixed(2)}
                    </p>
                )}

                {item.quantity >= item.item.stock && (
                    <p className="text-sm text-red-600 mt-2">Max stock reached</p>
                )}
            </div>


            {/* Quantity Controls and Total */}
            <div className="relative flex flex-col items-end justify-between gap-4 flex-shrink-0 mt-5">

                <button
                    onClick={() => {
                        setItemToDelete(item);
                        setIsDeleteDialogOpen(true);
                    }}
                    className="absolute -top-3 -right-3 text-red-500 hover:text-red-700 p-1 mr-2 cursor-pointer"
                    aria-label="Remove item"
                >
                    <Trash2 size={18} />
                </button>

                <div className="mt-6">
                    <QuantityController
                        quantity={localQuantity}
                        maxQuantity={item.item.stock}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                    />
                </div>

                <p className="font-semibold text-lg">Rs. {itemTotal.toFixed(2)}</p>
            </div>

            <ConfirmDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                title="Delete Item"
                description={`Are you sure you want to delete "${itemToDelete?.item.name}" from the cart?`}
                onConfirm={() => {
                    if (itemToDelete) {
                        onRemove(itemToDelete.item._id || "", itemToDelete.size);
                    }
                }}
                confirmLabel="Delete"
            />

        </div>
    );
};


export default CartItem;
