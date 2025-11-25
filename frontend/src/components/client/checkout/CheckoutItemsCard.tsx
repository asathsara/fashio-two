import type { CartItem } from '@/types/cart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
                    items.map((cartItem) => {
                        const hasDiscount = cartItem.discount > 0;
                        const itemTotal = cartItem.appliedPrice * cartItem.quantity;
                        const totalSavings = cartItem.discount * cartItem.quantity;

                        return (
                            <div
                                key={`${cartItem.item._id ?? cartItem.item.name}-${cartItem.size}`}
                                className="flex items-start justify-between rounded-lg border border-gray-100 p-4 relative"
                            >
                                {hasDiscount && (
                                    <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white text-xs">
                                        Save Rs. {totalSavings.toFixed(2)}
                                    </Badge>
                                )}
                                <div>
                                    <p className="font-semibold text-gray-900">{cartItem.item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Size {cartItem.size} • Qty {cartItem.quantity}
                                    </p>
                                </div>
                                <div className="text-right">
                                    {hasDiscount ? (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-semibold text-red-600">
                                                    Rs. {cartItem.appliedPrice.toFixed(2)}
                                                </p>
                                                <p className="text-xs text-gray-500 line-through">
                                                    Rs. {cartItem.originalPrice.toFixed(2)}
                                                </p>
                                            </div>
                                            <p className="text-lg font-semibold text-gray-900">
                                                Rs. {itemTotal.toFixed(2)}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm text-gray-500">Rs. {cartItem.appliedPrice.toFixed(2)}</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                Rs. {itemTotal.toFixed(2)}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })
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
