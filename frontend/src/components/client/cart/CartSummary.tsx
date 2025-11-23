import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
    subtotal: number;
    onCheckout: () => void;
    onClearCart: () => void;
    itemCount: number;
}

export const CartSummary = ({ subtotal, onCheckout, onClearCart, itemCount }: CartSummaryProps) => {
    const shipping = 0; // Free shipping for now
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-white border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({itemCount})</span>
                    <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium">Rs. {tax.toFixed(2)}</span>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total</span>
                <span>Rs. {total.toFixed(2)}</span>
            </div>

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
