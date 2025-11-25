import Cart from './cart.model.js';
import { Item } from '../item/index.js';
import PromoService from '../promo/promo.service.js';

class CartService {
    constructor() {
        this.promoService = new PromoService();
    }

    // Get user's cart with updated promo prices
    async getUserCart(userId) {
        let cart = await Cart.findOne({ user: userId }).populate('items.item');

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        // Update cart items with current promo prices
        if (cart.items.length > 0) {
            cart = await this.updateCartPrices(cart);
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

        // Get pricing information with promo
        const pricingInfo = await this.promoService.getItemPricing(itemId, item.price);

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
            // Update pricing in case promo changed
            cart.items[existingItemIndex].originalPrice = pricingInfo.originalPrice;
            cart.items[existingItemIndex].appliedPrice = pricingInfo.appliedPrice;
            cart.items[existingItemIndex].discount = pricingInfo.discount;
            cart.items[existingItemIndex].promoId = pricingInfo.promoId;
        } else {
            // Add new item with pricing info
            cart.items.push({
                item: itemId,
                quantity,
                size,
                selectedImageIndex,
                originalPrice: pricingInfo.originalPrice,
                appliedPrice: pricingInfo.appliedPrice,
                discount: pricingInfo.discount,
                promoId: pricingInfo.promoId
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

        // Update quantity
        cart.items[itemIndex].quantity = quantity;

        // Update pricing in case promo changed
        const pricingInfo = await this.promoService.getItemPricing(itemId, item.price);
        cart.items[itemIndex].originalPrice = pricingInfo.originalPrice;
        cart.items[itemIndex].appliedPrice = pricingInfo.appliedPrice;
        cart.items[itemIndex].discount = pricingInfo.discount;
        cart.items[itemIndex].promoId = pricingInfo.promoId;

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
                totalDiscount: 0,
                total: 0,
                totalItems: 0
            };
        }

        // Update cart prices before calculating summary
        const updatedCart = await this.updateCartPrices(cart);

        const subtotal = updatedCart.items.reduce((sum, cartItem) => {
            return sum + (cartItem.originalPrice * cartItem.quantity);
        }, 0);

        const totalDiscount = updatedCart.items.reduce((sum, cartItem) => {
            return sum + (cartItem.discount * cartItem.quantity);
        }, 0);

        const total = updatedCart.items.reduce((sum, cartItem) => {
            return sum + (cartItem.appliedPrice * cartItem.quantity);
        }, 0);

        return {
            items: updatedCart.items,
            subtotal: Math.round(subtotal * 100) / 100,
            totalDiscount: Math.round(totalDiscount * 100) / 100,
            total: Math.round(total * 100) / 100,
            totalItems: updatedCart.totalItems
        };
    }

    // Helper method to update cart prices based on current promos
    async updateCartPrices(cart) {
        let hasChanges = false;

        for (let i = 0; i < cart.items.length; i++) {
            const cartItem = cart.items[i];
            const item = cartItem.item;

            if (!item) continue;

            const pricingInfo = await this.promoService.getItemPricing(
                item._id || item,
                item.price
            );

            // Check if pricing has changed (promo started/ended)
            if (
                cartItem.originalPrice !== pricingInfo.originalPrice ||
                cartItem.appliedPrice !== pricingInfo.appliedPrice ||
                cartItem.discount !== pricingInfo.discount
            ) {
                cart.items[i].originalPrice = pricingInfo.originalPrice;
                cart.items[i].appliedPrice = pricingInfo.appliedPrice;
                cart.items[i].discount = pricingInfo.discount;
                cart.items[i].promoId = pricingInfo.promoId;
                hasChanges = true;
            }
        }

        if (hasChanges) {
            await cart.save();
        }

        return cart;
    }
}

export default CartService;
