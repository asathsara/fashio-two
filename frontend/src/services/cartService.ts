import api from './api';
import type {
    Cart,
    CartSummary,
    AddToCartRequest,
    UpdateCartItemRequest,
    RemoveFromCartRequest
} from '@/types/cart';

export const cartService = {
    // Get user's cart
    getCart: async (): Promise<Cart> => {
        const response = await api.get('/cart');
        return response.data;
    },

    // Get cart summary
    getCartSummary: async (): Promise<CartSummary> => {
        const response = await api.get('/cart/summary');
        return response.data;
    },

    // Add item to cart
    addToCart: async (data: AddToCartRequest): Promise<Cart> => {
        const response = await api.post('/cart/add', data);
        return response.data;
    },

    // Update cart item quantity
    updateCartItem: async (data: UpdateCartItemRequest): Promise<Cart> => {
        const response = await api.put('/cart/update', data);
        return response.data;
    },

    // Remove item from cart
    removeFromCart: async (data: RemoveFromCartRequest): Promise<Cart> => {
        const response = await api.delete('/cart/remove', { data });
        return response.data;
    },

    // Clear cart
    clearCart: async (): Promise<Cart> => {
        const response = await api.delete('/cart/clear');
        return response.data;
    }
};

export default cartService;
