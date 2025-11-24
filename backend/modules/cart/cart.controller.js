import { validationResult } from 'express-validator';
import CartService from './cart.service.js';

const cartService = new CartService();

class CartController {
    // Get user's cart
    async getCart(req, res) {
        try {
            const cart = await cartService.getUserCart(req.user._id);
            res.json(cart);
        } catch (error) {
            console.error('Get cart error:', error);
            res.status(500).json({ message: 'Error fetching cart' });
        }
    }

    // Add item to cart
    async addItem(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { itemId, quantity, size, selectedImageIndex } = req.body;
            const cart = await cartService.addItemToCart(
                req.user._id,
                itemId,
                quantity,
                size,
                selectedImageIndex
            );

            res.status(200).json(cart);
        } catch (error) {
            console.error('Add to cart error:', error);
            if (error.message === 'Item not found') {
                return res.status(404).json({ message: error.message });
            }
            if (error.message.includes('stock')) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error adding item to cart' });
        }
    }

    // Update cart item quantity
    async updateQuantity(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { itemId, size, quantity } = req.body;
            const cart = await cartService.updateCartItemQuantity(
                req.user._id,
                itemId,
                size,
                quantity
            );

            res.json(cart);
        } catch (error) {
            console.error('Update quantity error:', error);
            if (error.message === 'Cart not found' || error.message === 'Item not found in cart') {
                return res.status(404).json({ message: error.message });
            }
            if (error.message.includes('stock') || error.message.includes('Quantity')) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error updating cart item' });
        }
    }

    // Remove item from cart
    async removeItem(req, res) {
        try {
            const { itemId, size } = req.body;
            const cart = await cartService.removeItemFromCart(req.user._id, itemId, size);

            res.json(cart);
        } catch (error) {
            console.error('Remove from cart error:', error);
            if (error.message === 'Cart not found') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error removing item from cart' });
        }
    }

    // Clear cart
    async clearCart(req, res) {
        try {
            const cart = await cartService.clearCart(req.user._id);
            res.json(cart);
        } catch (error) {
            console.error('Clear cart error:', error);
            if (error.message === 'Cart not found') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error clearing cart' });
        }
    }

    // Get cart summary
    async getCartSummary(req, res) {
        try {
            const summary = await cartService.getCartSummary(req.user._id);
            res.json(summary);
        } catch (error) {
            console.error('Get cart summary error:', error);
            res.status(500).json({ message: 'Error fetching cart summary' });
        }
    }
}

export default new CartController();
