import Order, { ORDER_STATUSES, PAYMENT_STATUSES } from './order.model.js';
import Cart from '../cart/cart.model.js';
import { Item } from '../item/index.js';
import { User } from '../auth/index.js';
import mailService from '../../services/mail/mailService.js';

class OrderService {

    // create order from user's cart
    async createOrderFromCart(userId, { paymentMethod = 'Cash on Delivery', notes } = {}) {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'items.item',
            select: 'name price stock images'
        });

        if (!cart || cart.items.length === 0) {
            throw new Error('Your cart is empty');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const primaryAddress = user.addresses?.[0];
        if (!primaryAddress) {
            throw new Error('Please add an address to your profile before checking out');
        }
        const shippingAddress = typeof primaryAddress.toObject === 'function'
            ? primaryAddress.toObject()
            : primaryAddress;

        // Validate items & stock levels
        for (const cartItem of cart.items) {
            if (!cartItem.item) {
                throw new Error('One or more items in your cart are no longer available');
            }

            const freshItem = await Item.findOne({ _id: cartItem.item._id, isDeleted: { $ne: true } });
            if (!freshItem) {
                throw new Error(`${cartItem.item?.name || 'An item'} is no longer available`);
            }

            if (freshItem.stock < cartItem.quantity) {
                throw new Error(`Only ${freshItem.stock} unit(s) of ${freshItem.name} are in stock`);
            }
        }

        const orderItems = cart.items.map(cartItem => ({
            item: cartItem.item._id,
            name: cartItem.item.name,
            size: cartItem.size,
            quantity: cartItem.quantity,
            price: cartItem.appliedPrice || cartItem.item.price,
            originalPrice: cartItem.originalPrice || cartItem.item.price,
            discount: cartItem.discount || 0,
            promoId: cartItem.promoId || null,
            selectedImageIndex: cartItem.selectedImageIndex || 0
        }));

        const subtotal = orderItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
        const totalDiscount = orderItems.reduce((sum, item) => sum + (item.discount * item.quantity), 0);
        const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const order = await Order.create({
            user: userId,
            items: orderItems,
            shippingAddress,
            subtotal: Math.round(subtotal * 100) / 100,
            totalDiscount: Math.round(totalDiscount * 100) / 100,
            total: Math.round(total * 100) / 100,
            paymentMethod,
            notes
        });

        // Deduct stock
        await Promise.all(orderItems.map(async (orderItem) => {
            const item = await Item.findOne({ _id: orderItem.item, isDeleted: { $ne: true } });
            if (item) {
                item.stock = Math.max(0, item.stock - orderItem.quantity);
                await item.save();
            }
        }));

        // Clear cart
        cart.items = [];
        await cart.save();

        const populatedOrder = await order.populate([
            { path: 'items.item', select: 'name price images' },
            { path: 'user', select: 'name email' }
        ]);

        // Send confirmation email
        await mailService.sendOrderConfirmationEmail(populatedOrder);

        return populatedOrder;
    }

    async getUserOrders(userId) {
        return Order.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate({ path: 'items.item', select: 'name price images' });
    }

    async getOrderById(orderId, userId, isAdmin = false) {
        const order = await Order.findById(orderId)
            .populate({ path: 'items.item', select: 'name price images' })
            .populate({ path: 'user', select: 'name email' });

        if (!order) {
            throw new Error('Order not found');
        }

        const ownerId = order.user?._id ? order.user._id : order.user;
        if (!isAdmin && ownerId.toString() !== userId.toString()) {
            throw new Error('You are not allowed to view this order');
        }

        return order;
    }

    // get all orders for admin with optional status filter
    async getAllOrders({ status } = {}) {
        const query = {};
        if (status) {
            query.status = status;
        }

        return Order.find(query)
            .sort({ createdAt: -1 })
            .populate({ path: 'user', select: 'name email' })
            .populate({ path: 'items.item', select: 'name price images' });
    }

    // update order status and/or payment status
    async updateOrderStatus(orderId, { status, paymentStatus }) {
        if (status && !ORDER_STATUSES.includes(status)) {
            throw new Error('Invalid order status');
        }

        if (paymentStatus && !PAYMENT_STATUSES.includes(paymentStatus)) {
            throw new Error('Invalid payment status');
        }

        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        let statusChanged = false;
        if (status && order.status !== status) {
            order.status = status;
            statusChanged = true;
        }

        if (paymentStatus) {
            order.paymentStatus = paymentStatus;
        } else if (status === 'Delivered') {
            order.paymentStatus = 'Paid';
        }

        await order.save();
        const populatedOrder = await order.populate([
            { path: 'user', select: 'name email' },
            { path: 'items.item', select: 'name price images' }
        ]);

        if (statusChanged) {
            await mailService.sendOrderStatusUpdateEmail(populatedOrder);
        }

        return populatedOrder;
    }

    // get order statistics for admin dashboard
    // includes total orders, total revenue, pending orders, average order value,
    // monthly sales for past 6 months, top 5 best-selling items
    async getOrderStats() {

        // Aggregate total orders, revenue, pending orders, average order value 
        // Exclude cancelled orders from statistics
        const [summary] = await Order.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: '$total' },
                    pendingOrders: {
                        $sum: {
                            $cond: [{ $in: ['$status', ['Pending', 'Processing']] }, 1, 0]
                        }
                    },
                    averageOrderValue: { $avg: '$total' }
                }
            }
        ]);

        // Prepare monthly sales data for past 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);
        sixMonthsAgo.setHours(0, 0, 0, 0);

        // Aggregate monthly sales data for past 6 months (exclude cancelled orders)
        const monthlyRaw = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo },
                    status: { $ne: 'Cancelled' }
                }
            },
            {
                $group: {
                    _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                    total: { $sum: '$total' },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        // Format monthly data to ensure all 6 months are represented
        const monthBuckets = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            monthBuckets.push({ key, label: date.toLocaleString('default', { month: 'short' }), total: 0, orders: 0 });
        }

        // Merge raw data into buckets
        const monthlyMap = new Map(monthBuckets.map(bucket => [bucket.key, bucket]));
        monthlyRaw.forEach(entry => {
            const key = `${entry._id.year}-${entry._id.month}`;
            const target = monthlyMap.get(key);
            if (target) {
                target.total = entry.total;
                target.orders = entry.orders;
            }
        });

        const monthlySales = monthBuckets.map(({ label, total, orders }) => ({ label, total, orders }));

        // Aggregate top 5 best-selling items (exclude cancelled orders)
        const topItems = await Order.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.name',
                    totalSold: { $sum: '$items.quantity' },
                    revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 5 }
        ]);

        return {
            totalOrders: summary?.totalOrders || 0,
            pendingOrders: summary?.pendingOrders || 0,
            totalRevenue: summary?.totalRevenue || 0,
            averageOrderValue: summary?.averageOrderValue || 0,
            monthlySales,
            topItems: topItems.map(item => ({
                name: item._id,
                totalSold: item.totalSold,
                revenue: item.revenue
            }))
        };
    }

    async cancelOrder(orderId, userId) {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        if (order.user.toString() !== userId.toString()) {
            throw new Error('You are not allowed to cancel this order');
        }
        if (order.status === 'Cancelled') {
            throw new Error('Order is already cancelled');
        }
        if (order.status === 'Shipped' || order.status === 'Delivered') {
            throw new Error('Cannot cancel an order that has been shipped or delivered');
        }

        order.status = 'Cancelled';
        await order.save();
        // Restore stock for cancelled items
        await Promise.all(order.items.map(async (orderItem) => {
            const item = await Item.findOne({ _id: orderItem.item, isDeleted: { $ne: true } });
            if (item) {
                item.stock += orderItem.quantity;
                await item.save();
            }
        }));
        return order;
    }
}

export default OrderService;
