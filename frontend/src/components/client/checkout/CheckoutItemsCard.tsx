import type { CartItem } from '@/types/cart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CheckoutItemsCardProps {
    items: CartItem[];
}

export const CheckoutItemsCard = ({ items }: CheckoutItemsCardProps) => {
    const hasItems = items.length > 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Your Bag</CardTitle>
                <CardDescription>Review the pieces heading your way</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {hasItems ? (
                    items.map((cartItem) => (
                        <div
                            key={`${cartItem.item._id ?? cartItem.item.name}-${cartItem.size}`}
                            className="flex items-start justify-between rounded-lg border border-gray-100 p-4"
                        >
                            <div>
                                <p className="font-semibold text-gray-900">{cartItem.item.name}</p>
                                <p className="text-sm text-gray-500">
                                    Size {cartItem.size} • Qty {cartItem.quantity}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Rs. {cartItem.item.price.toFixed(2)}</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    Rs. {(cartItem.item.price * cartItem.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-gray-500">
                        No items selected yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CheckoutItemsCard;
