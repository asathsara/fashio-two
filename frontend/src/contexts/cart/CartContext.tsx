import { createContext } from 'react';
import type { Cart, AddToCartRequest, UpdateCartItemRequest, RemoveFromCartRequest } from '@/types/cart';

export interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    itemCount: number;

    fetchCart: () => Promise<void>;
    addToCart: (data: AddToCartRequest) => Promise<void>;
    updateCartItem: (data: UpdateCartItemRequest) => Promise<void>;
    removeFromCart: (data: RemoveFromCartRequest) => Promise<void>;
    clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
