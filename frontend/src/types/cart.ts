import type { Item } from './item';

export interface CartItem {
    item: Item;
    quantity: number;
    size: string;
    selectedImageIndex: number;
    originalPrice: number;
    appliedPrice: number;
    discount: number;
    promoId?: string | null;
}

export interface Cart {
    _id: string;
    user: string;
    items: CartItem[];
    totalItems: number;
    createdAt: string;
    updatedAt: string;
}

export interface CartSummary {
    items: CartItem[];
    subtotal: number;
    totalDiscount: number;
    total: number;
    totalItems: number;
}

export interface AddToCartRequest {
    itemId: string;
    quantity: number;
    size: string;
    selectedImageIndex?: number;
}

export interface UpdateCartItemRequest {
    itemId: string;
    size: string;
    quantity: number;
}

export interface RemoveFromCartRequest {
    itemId: string;
    size: string;
}
