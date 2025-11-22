import Cart from './cart.model.js';
import { Item } from '../item/index.js';

class CartService {
    // Get user's cart
    async getUserCart(userId) {
        let cart = await Cart.findOne({ user: userId }).populate('items.item');

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        return cart;
    }

    // Add item to cart
    async addItemToCart(userId, itemId, quantity, size, selectedImageIndex = 0) {
        // Verify item exists
        const item = await Item.findById(itemId);
        if (!item) {
            throw new Error('Item not found');
        }

        // Check if item is in stock
        if (item.stock < quantity) {
            throw new Error(`Only ${item.stock} items available in stock`);
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        // Check if item with same size already exists
        const existingItemIndex = cart.items.findIndex(
            cartItem => cartItem.item.toString() === itemId && cartItem.size === size
        );

        if (existingItemIndex > -1) {
            // Update quantity
            const newQuantity = cart.items[existingItemIndex].quantity + quantity;

            if (newQuantity > item.stock) {
                throw new Error(`Cannot add more. Only ${item.stock} items available in stock`);
            }

            cart.items[existingItemIndex].quantity = newQuantity;
        } else {
            // Add new item
            cart.items.push({
                item: itemId,
                quantity,
                size,
                selectedImageIndex
            });
        }

        await cart.save();
        await cart.populate('items.item');

        return cart;
    }

    // Update cart item quantity
    async updateCartItemQuantity(userId, itemId, size, quantity) {
        if (quantity < 1) {
            throw new Error('Quantity must be at least 1');
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        const itemIndex = cart.items.findIndex(
            cartItem => cartItem.item.toString() === itemId && cartItem.size === size
        );

        if (itemIndex === -1) {
            throw new Error('Item not found in cart');
        }

        // Verify stock
        const item = await Item.findById(itemId);
        if (!item) {
            throw new Error('Item not found');
        }

        if (quantity > item.stock) {
            throw new Error(`Only ${item.stock} items available in stock`);
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        await cart.populate('items.item');

        return cart;
    }

    // Remove item from cart
    async removeItemFromCart(userId, itemId, size) {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.items = cart.items.filter(
            cartItem => !(cartItem.item.toString() === itemId && cartItem.size === size)
        );

        await cart.save();
        await cart.populate('items.item');

        return cart;
    }

    // Clear cart
    async clearCart(userId) {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.items = [];
        await cart.save();

        return cart;
    }

    // Get cart summary (for checkout)
    async getCartSummary(userId) {
        const cart = await Cart.findOne({ user: userId }).populate('items.item');

        if (!cart || cart.items.length === 0) {
            return {
                items: [],
                subtotal: 0,
                totalItems: 0
            };
        }

        const subtotal = cart.items.reduce((sum, cartItem) => {
            return sum + (cartItem.item.price * cartItem.quantity);
        }, 0);

        return {
            items: cart.items,
            subtotal,
            totalItems: cart.totalItems
        };
    }
}

export default CartService;
