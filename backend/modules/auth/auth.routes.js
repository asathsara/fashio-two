import { Router } from 'express';
import { body } from 'express-validator';
import authController from './auth.controller.js';
import authMiddleware from '../../middleware/auth.js';

const { protect } = authMiddleware;
const router = Router();

// Validation middleware
const registerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

// Public Routes 
// Registration & Login
router.post('/register', registerValidation, (req, res) => authController.register(req, res));
router.post('/login', loginValidation, (req, res) => authController.login(req, res));

// Email Verification
router.post('/verify-email', (req, res) => authController.verifyEmail(req, res));

// Password Reset
router.post('/forgot-password', body('email').isEmail(), (req, res) => authController.forgotPassword(req, res));
router.post('/reset-password',
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
    (req, res) => authController.resetPassword(req, res)
);

// Google OAuth
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);

// Protected Routes
router.get('/me', protect, (req, res) => authController.getMe(req, res));
router.post('/logout', protect, (req, res) => authController.logout(req, res));
router.post('/resend-verification', protect, (req, res) => authController.resendVerification(req, res));

export default router;
