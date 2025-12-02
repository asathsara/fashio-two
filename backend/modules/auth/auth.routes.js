import { Router } from 'express';
import { body } from 'express-validator';
import authController from './auth.controller.js';
import authMiddleware from '../../middleware/auth.js';
import { authLimiter, emailLimiter } from '../../middleware/rateLimiter.js';

const { protect } = authMiddleware;
const { admin } = authMiddleware;
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

const updateProfileValidation = [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please provide a valid email'),
    body('address.phone').optional().trim().notEmpty().withMessage('Phone is required'),
    body('address.country').optional().trim().notEmpty().withMessage('Country is required'),
    body('address.city').optional().trim().notEmpty().withMessage('City is required'),
    body('address.postalCode').optional().trim().notEmpty().withMessage('Postal code is required'),
    body('address.addressLine1').optional().trim().notEmpty().withMessage('Address line 1 is required'),
];

const changePasswordValidation = [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
];

// Public Routes 
// Registration & Login
router.post('/register', authLimiter, registerValidation, (req, res) => authController.register(req, res));
router.post('/login', authLimiter, loginValidation, (req, res) => authController.login(req, res));

// Email Verification
router.post('/verify-email', (req, res) => authController.verifyEmail(req, res));

// Password Reset
router.post('/forgot-password', authLimiter, body('email').isEmail(), (req, res) => authController.forgotPassword(req, res));
router.post('/reset-password',
    authLimiter,
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
router.post('/resend-verification', protect, emailLimiter, (req, res) => authController.resendVerification(req, res));

// Profile Management
router.put('/profile', protect, updateProfileValidation, (req, res) => authController.updateProfile(req, res));
router.put('/change-password', protect, changePasswordValidation, (req, res) => authController.changePassword(req, res));

// Admin Routes
router.get('/admin/users', protect, admin, (req, res) => authController.getAllUsers(req, res));
router.put('/admin/users/:userId/role', protect, admin, (req, res) => authController.updateUserRole(req, res));
router.delete('/admin/users/:userId', protect, admin, (req, res) => authController.deleteUser(req, res));

export default router;
