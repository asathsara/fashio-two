import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface CartSummaryProps {
    subtotal: number;
    totalDiscount?: number;
    total: number;
    onCheckout: () => void;
    onClearCart: () => void;
    itemCount: number;
}

export const CartSummary = ({
    subtotal,
    totalDiscount = 0,
    total,
    onCheckout,
    onClearCart,
    itemCount
}: CartSummaryProps) => {
    const hasDiscount = totalDiscount > 0;

    return (
        <div className="bg-white border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({itemCount})</span>
                    <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
                </div>

                {hasDiscount && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount</span>
                        <span className="font-medium text-green-600">-Rs. {totalDiscount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-semibold mb-2">
                <span>Total</span>
                <span>Rs. {total.toFixed(2)}</span>
            </div>

            {hasDiscount && (
                <div className="flex justify-center mb-4">
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">
                        You save Rs. {totalDiscount.toFixed(2)}!
                    </Badge>
                </div>
            )}

            <Button
                onClick={onCheckout}
                className="w-full mb-3"
            >
                Proceed to Checkout
            </Button>

            <Button
                onClick={onClearCart}
                variant="outline"
                className="w-full"
            >
                Clear Cart
            </Button>

            <div className="mt-6 text-xs text-gray-500 space-y-1">
                <p>✓ Secure checkout</p>
                <p>✓ Free shipping on all orders</p>
                <p>✓ 30-day return policy</p>
            </div>
        </div>
    );
};

export default CartSummary;
