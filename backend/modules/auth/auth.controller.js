import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { validationResult } from 'express-validator';
import passport from 'passport';
import AuthService from './auth.service.js';

const authService = new AuthService();

class AuthController {
    // Registration 
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, password } = req.body;
            const result = await authService.registerUser(name, email, password);

            res.status(201).json({
                message: 'Registration successful! Please check your email.',
                user: result.user
            });
        } catch (error) {
            console.error('Register error:', error);
            if (error.message === 'User already exists') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Server error during registration' });
        }
    }

    // Login 
    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;
            const result = await authService.loginUser(email, password);

            const token = this.generateToken(result.user.id);
            this.setTokenCookie(res, token);

            res.json({
                token,
                user: result.user
            });
        } catch (error) {
            console.error('Login error:', error);
            if (error.message === 'Invalid credentials' || error.message === 'Please sign in with Google') {
                return res.status(401).json({ message: error.message });
            }
            res.status(500).json({ message: 'Server error during login' });
        }
    }

    // Google OAuth
    googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

    googleCallback = (req, res, next) => {
        passport.authenticate(
            'google',
            { failureRedirect: `${process.env.FRONTEND_URL}/login`, session: false },
            (err, user) => {
                if (err || !user) {
                    console.error('Google auth failed:', err);
                    return res.redirect(`${process.env.FRONTEND_URL}/login?error=unauthorized`);
                }

                const token = this.generateToken(user._id);
                this.setTokenCookie(res, token);

                res.redirect(`${process.env.FRONTEND_URL}/`);
            }
        )(req, res, next);
    };

    // Email Verification
    async verifyEmail(req, res) {
        try {
            const { token } = req.body;
            await authService.verifyUserEmail(token);

            res.json({ message: 'Email verified successfully!' });
        } catch (error) {
            console.error('Verify email error:', error);
            if (error.message === 'Invalid or expired verification token') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Server error during email verification' });
        }
    }

    async resendVerification(req, res) {
        try {
            await authService.resendVerificationEmail(req.user._id);

            res.json({ message: 'Verification email sent!' });
        } catch (error) {
            console.error('Resend verification error:', error);
            if (error.message === 'User not found' || error.message === 'Email already verified') {
                return res.status(error.message === 'User not found' ? 404 : 400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Server error sending verification email' });
        }
    }

    // Password Reset
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            await authService.sendPasswordResetEmail(email);

            res.json({ message: 'If an account exists, a password reset email has been sent.' });
        } catch (error) {
            console.error('Forgot password error:', error);
            if (error.message === 'This account uses Google sign-in. No password reset needed.') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Server error sending reset email' });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            await authService.resetUserPassword(token, newPassword);

            res.json({ message: 'Password reset successfully!' });
        } catch (error) {
            console.error('Reset password error:', error);
            if (error.message === 'Invalid or expired reset token') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Server error resetting password' });
        }
    }

    // Management
    async getMe(req, res) {
        try {
            const user = await authService.getUserById(req.user._id);

            res.json(user);
        } catch (error) {
            console.error('Get me error:', error);
            res.status(500).json({ message: 'Server error fetching user' });
        }
    }

    logout(req, res) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({ message: 'Logged out successfully' });
    }

    // Helper Methods
    generateToken(id) {
        return sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    }

    setTokenCookie(res, token) {
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
    }
}

export default new AuthController();
