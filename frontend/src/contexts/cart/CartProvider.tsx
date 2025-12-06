import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { CartContext } from './CartContext';
import { cartService } from '@/services/cartService';
import type { Cart, AddToCartRequest, UpdateCartItemRequest, RemoveFromCartRequest } from '@/types/cart';
import { useAuth } from '@/hooks/UseAuth';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errorHandler';

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();
    const activeRequestsRef = useRef(0);
    const requestIdRef = useRef(0);
    const lastAppliedRequestIdRef = useRef(0);

    const itemCount = cart?.totalItems || 0;

    const beginRequest = () => {
        activeRequestsRef.current += 1;
        setLoading(true);
        requestIdRef.current += 1;
        return requestIdRef.current;
    };

    const endRequest = () => {
        activeRequestsRef.current = Math.max(0, activeRequestsRef.current - 1);
        if (activeRequestsRef.current === 0) {
            setLoading(false);
        }
    };

    const applyCartResponse = (requestId: number, nextCart: Cart) => {
        if (requestId >= lastAppliedRequestIdRef.current) {
            lastAppliedRequestIdRef.current = requestId;
            setCart(nextCart);
        }
    };

    const fetchCart = useCallback(async () => {
        if (!isAuthenticated) {
            setCart(null);
            return;
        }

        try {
            const requestId = beginRequest();
            const data = await cartService.getCart();
            applyCartResponse(requestId, data);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
            // Don't show error toast on initial load
        } finally {
            endRequest();
        }
    }, [isAuthenticated]);

    const addToCart = async (data: AddToCartRequest) => {
        const requestId = beginRequest();
        try {
            const updatedCart = await cartService.addToCart(data);
            applyCartResponse(requestId, updatedCart);
            toast.success('Item added to cart');
        } catch (error) {
            const message = getErrorMessage(error, 'Failed to add item to cart');
            toast.error(message);
            throw error;
        } finally {
            endRequest();
        }
    };

    const updateCartItem = async (data: UpdateCartItemRequest) => {
        const requestId = beginRequest();
        try {
            const updatedCart = await cartService.updateCartItem(data);
            applyCartResponse(requestId, updatedCart);
            toast.success('Cart updated');
        } catch (error) {
            const message = getErrorMessage(error, 'Failed to update cart');
            toast.error(message);
            throw error;
        } finally {
            endRequest();
        }
    };

    const removeFromCart = async (data: RemoveFromCartRequest) => {
        const requestId = beginRequest();
        try {
            const updatedCart = await cartService.removeFromCart(data);
            applyCartResponse(requestId, updatedCart);
            toast.success('Item removed from cart');
        } catch (error) {
            const message = getErrorMessage(error, 'Failed to remove item');
            toast.error(message);
            throw error;
        } finally {
            endRequest();
        }
    };

    const clearCart = async () => {
        const requestId = beginRequest();
        try {
            const updatedCart = await cartService.clearCart();
            applyCartResponse(requestId, updatedCart);
            toast.success('Cart cleared');
        } catch (error) {
            const message = getErrorMessage(error, 'Failed to clear cart');
            toast.error(message);
            throw error;
        } finally {
            endRequest();
        }
    };

    // Fetch cart on mount and when auth status changes
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const value = {
        cart,
        loading,
        itemCount,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
