import { useState, useEffect, useCallback, type ReactNode } from 'react';
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

    const itemCount = cart?.totalItems || 0;

    const fetchCart = useCallback(async () => {
        if (!isAuthenticated) {
            setCart(null);
            return;
        }

        try {
            setLoading(true);
            const data = await cartService.getCart();
            setCart(data);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
            // Don't show error toast on initial load
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const addToCart = async (data: AddToCartRequest) => {
        try {
            setLoading(true);
            const updatedCart = await cartService.addToCart(data);
            setCart(updatedCart);
            toast.success('Item added to cart');
        } catch (error) {
            const message = getErrorMessage(error, 'Failed to add item to cart');
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (data: UpdateCartItemRequest) => {
        try {
            setLoading(true);
            const updatedCart = await cartService.updateCartItem(data);
            setCart(updatedCart);
            toast.success('Cart updated');
        } catch (error) {
            const message = getErrorMessage(error, 'Failed to update cart');
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (data: RemoveFromCartRequest) => {
        try {
            setLoading(true);
            const updatedCart = await cartService.removeFromCart(data);
            setCart(updatedCart);
            toast.success('Item removed from cart');
        } catch (error) {
            const message = getErrorMessage(error, 'Failed to remove item');
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            const updatedCart = await cartService.clearCart();
            setCart(updatedCart);
            toast.success('Cart cleared');
        } catch (error) {
            const message = getErrorMessage(error, 'Failed to clear cart');
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
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
