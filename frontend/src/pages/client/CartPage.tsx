import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/components/client/cart/CartItem';
import { CartSummary } from '@/components/client/cart/CartSummary';
import { EmptyCart } from '@/components/client/cart/EmptyCart';
import { Spinner } from '@/components/common/Spinner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ComponentErrorBoundary, ComponentFallback } from '@/error-boundaries';

export const CartPage = () => {
    const { cart, loading, updateCartItem, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const [showClearDialog, setShowClearDialog] = useState(false);

    const handleUpdateQuantity = async (itemId: string, size: string, quantity: number) => {
        try {
            await updateCartItem({ itemId, size, quantity });
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const handleRemoveItem = async (itemId: string, size: string) => {
        try {
            await removeFromCart({ itemId, size });
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
            setShowClearDialog(false);
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (loading && !cart) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Spinner />
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return <EmptyCart />;
    }

    const subtotal = cart.items.reduce(
        (sum, item) => sum + item.originalPrice * item.quantity,
        0
    );

    const totalDiscount = cart.items.reduce(
        (sum, item) => sum + item.discount * item.quantity,
        0
    );

    const total = cart.items.reduce(
        (sum, item) => sum + item.appliedPrice * item.quantity,
        0
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    <ComponentErrorBoundary
                        name="CartItemsList"
                        fallbackRender={({ error, resetErrorBoundary }) => (
                            <ComponentFallback
                                boundaryName="Cart Items"
                                error={error}
                                onRetry={resetErrorBoundary}
                                compact
                            />
                        )}
                    >
                        {cart.items.map((item) => (
                            <CartItem
                                key={`${item.item._id}-${item.size}`}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </ComponentErrorBoundary>
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                    <ComponentErrorBoundary
                        name="CartSummary"
                        fallbackRender={({ error, resetErrorBoundary }) => (
                            <ComponentFallback
                                boundaryName="Cart Summary"
                                error={error}
                                onRetry={resetErrorBoundary}
                                compact
                            />
                        )}
                    >
                        <CartSummary
                            subtotal={subtotal}
                            totalDiscount={totalDiscount}
                            total={total}
                            itemCount={cart.totalItems}
                            onCheckout={handleCheckout}
                            onClearCart={() => setShowClearDialog(true)}
                        />
                    </ComponentErrorBoundary>
                </div>
            </div>



            <ConfirmDialog
                open={showClearDialog}
                onOpenChange={setShowClearDialog}
                title="Clear Cart"
                description="Are you sure you want to remove all items from your cart? This action cannot be undone."
                onConfirm={handleClearCart}
                confirmLabel={'Clear Cart'}
                cancelLabel="Cancel"
            />
        </div>
    );
};

export default CartPage;
