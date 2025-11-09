import User from './auth.model.js';
import mailService from '../../services/emailService.js';

const { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail } = mailService;

class AuthService {
    // Registration
    async registerUser(name, email, password) {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('User already exists');
        }

        // Create new user
        const user = await User.create({ name, email, password });

        // Generate and send verification email
        const verificationToken = user.generateVerificationToken();
        await user.save();
        await sendVerificationEmail(email, verificationToken, name);

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                emailVerified: user.emailVerified
            }
        };
    }

    // Login
    async loginUser(email, password) {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check if user uses Google sign-in
        if (user.googleId && !user.password) {
            throw new Error('Please sign in with Google');
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                emailVerified: user.emailVerified,
                avatar: user.avatar
            }
        };
    }

    // Email Verification
    async verifyUserEmail(token) {
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            throw new Error('Invalid or expired verification token');
        }

        user.emailVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        return { message: 'Email verified successfully!' };
    }

    async resendVerificationEmail(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.emailVerified) {
            throw new Error('Email already verified');
        }

        const verificationToken = user.generateVerificationToken();
        await user.save();
        await sendVerificationEmail(user.email, verificationToken, user.name);

        return { message: 'Verification email sent!' };
    }

    // Password Reset
    async sendPasswordResetEmail(email) {
        const user = await User.findOne({ email });

        if (!user) {
            // Return success message for security (don't reveal if user exists)
            return { message: 'If an account exists, a password reset email has been sent.' };
        }

        if (user.googleId && !user.password) {
            throw new Error('This account uses Google sign-in. No password reset needed.');
        }

        const resetToken = user.generateResetToken();
        await user.save();
        await sendPasswordResetEmail(email, resetToken, user.name);

        return { message: 'If an account exists, a password reset email has been sent.' };
    }

    async resetUserPassword(token, newPassword) {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() }
        });

        if (!user) {
            throw new Error('Invalid or expired reset token');
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        return { message: 'Password reset successfully!' };
    }

    // User Management
    async getUserById(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
            avatar: user.avatar
        };
    }

    async updateUserLastLogin(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.lastLogin = Date.now();
        await user.save();
        return user;
    }
}

export default AuthService;
