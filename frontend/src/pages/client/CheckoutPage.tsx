import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck } from 'lucide-react';
import { Spinner } from '@/components/common/Spinner';
import { EmptyCart } from '@/components/client/cart/EmptyCart';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/UseAuth';
import CheckoutAddressCard from '@/components/client/checkout/CheckoutAddressCard';
import CheckoutItemsCard from '@/components/client/checkout/CheckoutItemsCard';
import CheckoutSummaryCard from '@/components/client/checkout/CheckoutSummaryCard';
import { useCreateOrder } from '@/hooks/useOrders';
import { ComponentErrorBoundary, ComponentFallback } from '@/error-boundaries';

export const CheckoutPage = () => {
    const { cart, loading } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const createOrder = useCreateOrder();
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [notes, setNotes] = useState('');

    const address = user?.addresses?.[0] ?? null;

    const { subtotal, totalDiscount, total, itemCount } = useMemo(() => {
        const subtotalValue = cart?.items.reduce((sum, cartItem) => sum + cartItem.originalPrice * cartItem.quantity, 0) ?? 0;
        const discountValue = cart?.items.reduce((sum, cartItem) => sum + cartItem.discount * cartItem.quantity, 0) ?? 0;
        const totalValue = cart?.items.reduce((sum, cartItem) => sum + cartItem.appliedPrice * cartItem.quantity, 0) ?? 0;
        const count = cart?.items.reduce((sum, cartItem) => sum + cartItem.quantity, 0) ?? 0;

        return {
            subtotal: subtotalValue,
            totalDiscount: discountValue,
            total: totalValue,
            itemCount: count
        };
    }, [cart]);

    const handlePlaceOrder = async () => {
        if (!address || !cart || cart.items.length === 0 || createOrder.isPending || loading) {
            return;
        }

        try {
            await createOrder.mutateAsync({
                paymentMethod,
                notes: notes.trim() ? notes.trim() : undefined
            });
            navigate('/profile', { state: { highlight: 'orders' } });
        } catch {
            // handled in hook toast
        }
    };

    if (loading && !cart) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="container mx-auto max-w-7xl px-4 py-10">
            <div className="mb-8 flex flex-col gap-2">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Step 02</p>
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                <p className="text-gray-600">Confirm your Rs. {total.toFixed(2)} order and relax while we prepare the package.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <ComponentErrorBoundary
                        name="CheckoutAddress"
                        fallbackRender={({ error, resetErrorBoundary }) => (
                            <ComponentFallback
                                boundaryName="Delivery Address"
                                error={error}
                                onRetry={resetErrorBoundary}
                                compact
                            />
                        )}
                    >
                        <CheckoutAddressCard address={address} />
                    </ComponentErrorBoundary>
                    <ComponentErrorBoundary
                        name="CheckoutItems"
                        fallbackRender={({ error, resetErrorBoundary }) => (
                            <ComponentFallback
                                boundaryName="Order Items"
                                error={error}
                                onRetry={resetErrorBoundary}
                                compact
                            />
                        )}
                    >
                        <CheckoutItemsCard items={cart.items} />
                    </ComponentErrorBoundary>

                    <Alert className="bg-gray-900 text-white">
                        <ShieldCheck className="mr-2 h-5 w-5" />
                        <AlertDescription>
                            You only pay upon delivery. Prices remain locked in Rs. even if promos change later.
                        </AlertDescription>
                    </Alert>
                </div>

                <div className="lg:col-span-1">
                    <ComponentErrorBoundary
                        name="CheckoutSummary"
                        fallbackRender={({ error, resetErrorBoundary }) => (
                            <ComponentFallback
                                boundaryName="Order Summary"
                                error={error}
                                onRetry={resetErrorBoundary}
                                compact
                            />
                        )}
                    >
                        <CheckoutSummaryCard
                            subtotal={subtotal}
                            totalDiscount={totalDiscount}
                            total={total}
                            itemCount={itemCount}
                            paymentMethod={paymentMethod}
                            notes={notes}
                            disabled={!address || loading}
                            loading={createOrder.isPending}
                            onNotesChange={setNotes}
                            onPaymentMethodChange={setPaymentMethod}
                            onPlaceOrder={handlePlaceOrder}
                        />
                    </ComponentErrorBoundary>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
