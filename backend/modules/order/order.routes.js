import { Router } from 'express';
import { body } from 'express-validator';
import orderController from './order.controller.js';
import authMiddleware from '../../middleware/auth.js';
import { ORDER_STATUSES, PAYMENT_STATUSES } from './order.model.js';

const router = Router();
const { protect, admin } = authMiddleware;

const checkoutValidation = [
    body('paymentMethod').optional().isString().trim().isLength({ max: 50 }).withMessage('Payment method is too long'),
    body('notes').optional().isString().trim().isLength({ max: 500 }).withMessage('Notes must be less than 500 characters')
];

const updateStatusValidation = [
    body('status').optional().isIn(ORDER_STATUSES).withMessage('Invalid order status'),
    body('paymentStatus').optional().isIn(PAYMENT_STATUSES).withMessage('Invalid payment status'),
    body().custom((_, { req }) => {
        if (!req.body.status && !req.body.paymentStatus) {
            throw new Error('Provide a status or paymentStatus to update');
        }
        return true;
    })
];

router.use(protect);

// Customer routes
router.post('/checkout', checkoutValidation, (req, res) => orderController.checkout(req, res));
router.get('/me', (req, res) => orderController.getMyOrders(req, res));

// Admin routes
router.get('/admin/stats', admin, (req, res) => orderController.getStats(req, res));
router.get('/admin', admin, (req, res) => orderController.getAdminOrders(req, res));
router.patch('/:id/status', admin, updateStatusValidation, (req, res) => orderController.updateStatus(req, res));

// Single order after admin routes to avoid conflicts
router.get('/:id', (req, res) => orderController.getOrder(req, res));

export default router;
