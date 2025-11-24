import { validationResult } from 'express-validator';
import OrderService from './order.service.js';

const orderService = new OrderService();

class OrderController {
    async checkout(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const order = await orderService.createOrderFromCart(req.user._id, req.body);
            res.status(201).json({
                message: 'Order placed successfully',
                order
            });
        } catch (error) {
            console.error('Checkout error:', error);
            if (error.message.includes('address')) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message.includes('cart') || error.message.includes('stock') || error.message.includes('available')) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Unable to place order at the moment' });
        }
    }

    async getMyOrders(req, res) {
        try {
            const orders = await orderService.getUserOrders(req.user._id);
            res.json(orders);
        } catch (error) {
            console.error('Get my orders error:', error);
            res.status(500).json({ message: 'Unable to fetch orders' });
        }
    }

    async getOrder(req, res) {
        try {
            const order = await orderService.getOrderById(
                req.params.id,
                req.user._id,
                req.user.role === 'admin'
            );
            res.json(order);
        } catch (error) {
            console.error('Get order error:', error);
            if (error.message === 'Order not found') {
                return res.status(404).json({ message: error.message });
            }
            if (error.message.includes('not allowed')) {
                return res.status(403).json({ message: error.message });
            }
            res.status(500).json({ message: 'Unable to fetch order details' });
        }
    }

    async getAdminOrders(req, res) {
        try {
            const { status } = req.query;
            const orders = await orderService.getAllOrders({ status });
            res.json(orders);
        } catch (error) {
            console.error('Admin orders error:', error);
            res.status(500).json({ message: 'Unable to fetch orders' });
        }
    }

    async updateStatus(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const updated = await orderService.updateOrderStatus(req.params.id, req.body);
            res.json({
                message: 'Order updated',
                order: updated
            });
        } catch (error) {
            console.error('Update order status error:', error);
            if (
                error.message === 'Order not found' ||
                error.message.includes('Invalid') ||
                error.message.includes('Provide')
            ) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Unable to update order' });
        }
    }

    async getStats(req, res) {
        try {
            const stats = await orderService.getOrderStats();
            res.json(stats);
        } catch (error) {
            console.error('Order stats error:', error);
            res.status(500).json({ message: 'Unable to fetch order stats' });
        }
    }

    async cancelOrder(req, res) {
        try {
            const canceledOrder = await orderService.cancelOrder(req.params.id, req.user._id);
            res.json({
                message: 'Order cancelled successfully',
                order: canceledOrder
            });
        } catch (error) {
            console.error('Cancel order error:', error);
            if (
                error.message === 'Order not found' ||
                error.message.includes('already cancelled') ||
                error.message.includes('not allowed')
            ) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Unable to cancel order' });
        }
    }

}

export default new OrderController();
