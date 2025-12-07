import { type ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CartContext } from './CartContext';
import { cartService } from '@/services/cartService';
import type { AddToCartRequest, UpdateCartItemRequest, RemoveFromCartRequest } from '@/types/cart';
import { useAuth } from '@/hooks/UseAuth';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errorHandler';

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const { isAuthenticated } = useAuth();
    const queryClient = useQueryClient();

    const { data: cart, isLoading, refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: cartService.getCart,
        enabled: isAuthenticated,
    });

    const itemCount = cart?.totalItems || 0;

    const addToCartMutation = useMutation({
        mutationFn: cartService.addToCart,
        onSuccess: (updatedCart) => {
            queryClient.setQueryData(['cart'], updatedCart);
            toast.success('Item added to cart');
        },
        onError: (error) => {
            const message = getErrorMessage(error, 'Failed to add item to cart');
            toast.error(message);
        },
    });

    const updateCartItemMutation = useMutation({
        mutationFn: cartService.updateCartItem,
        onSuccess: (updatedCart) => {
            queryClient.setQueryData(['cart'], updatedCart);
            toast.success('Cart updated');
        },
        onError: (error) => {
            const message = getErrorMessage(error, 'Failed to update cart');
            toast.error(message);
        },
    });

    const removeFromCartMutation = useMutation({
        mutationFn: cartService.removeFromCart,
        onSuccess: (updatedCart) => {
            queryClient.setQueryData(['cart'], updatedCart);
            toast.success('Item removed from cart');
        },
        onError: (error) => {
            const message = getErrorMessage(error, 'Failed to remove item');
            toast.error(message);
        },
    });

    const clearCartMutation = useMutation({
        mutationFn: cartService.clearCart,
        onSuccess: (updatedCart) => {
            queryClient.setQueryData(['cart'], updatedCart);
            toast.success('Cart cleared');
        },
        onError: (error) => {
            const message = getErrorMessage(error, 'Failed to clear cart');
            toast.error(message);
        },
    });

    const value = {
        cart: cart ?? null,
        loading: isLoading ||
            addToCartMutation.isPending ||
            updateCartItemMutation.isPending ||
            removeFromCartMutation.isPending ||
            clearCartMutation.isPending,
        itemCount,
        fetchCart: async () => { await refetch(); },
        addToCart: async (data: AddToCartRequest) => { await addToCartMutation.mutateAsync(data); },
        updateCartItem: async (data: UpdateCartItemRequest) => { await updateCartItemMutation.mutateAsync(data); },
        removeFromCart: async (data: RemoveFromCartRequest) => { await removeFromCartMutation.mutateAsync(data); },
        clearCart: async () => { await clearCartMutation.mutateAsync(); }
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
