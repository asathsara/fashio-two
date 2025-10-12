import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth/index.js';
import authMiddleware from '../middleware/auth.js';

const { protect } = authMiddleware;

const { register, login, googleLogin, verifyEmail, resendVerification, forgotPassword, resetPassword, getMe, logout } = authController;

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

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/google', googleLogin);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', body('email').isEmail(), forgotPassword);
router.post('/reset-password',
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
    resetPassword
);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.post('/resend-verification', protect, resendVerification);

export default router;