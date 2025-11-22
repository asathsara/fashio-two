import { Router } from 'express';
import { body } from 'express-validator';
import cartController from './cart.controller.js';
import authMiddleware from '../../middleware/auth.js';

const { protect } = authMiddleware;
const router = Router();

// Validation middleware
const addItemValidation = [
    body('itemId').notEmpty().withMessage('Item ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('size').notEmpty().withMessage('Size is required'),
    body('selectedImageIndex').optional().isInt({ min: 0 }).withMessage('Invalid image index')
];

const updateQuantityValidation = [
    body('itemId').notEmpty().withMessage('Item ID is required'),
    body('size').notEmpty().withMessage('Size is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

// All cart routes require authentication
router.use(protect);

// Cart routes
router.get('/', (req, res) => cartController.getCart(req, res));
router.get('/summary', (req, res) => cartController.getCartSummary(req, res));
router.post('/add', addItemValidation, (req, res) => cartController.addItem(req, res));
router.put('/update', updateQuantityValidation, (req, res) => cartController.updateQuantity(req, res));
router.delete('/remove', (req, res) => cartController.removeItem(req, res));
router.delete('/clear', (req, res) => cartController.clearCart(req, res));

export default router;
