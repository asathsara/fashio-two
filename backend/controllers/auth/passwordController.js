import User from '../../models/user.js';
import mailService from '../../services/emailService.js';

const { sendPasswordResetEmail } = mailService;

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.json({ message: 'If an account exists, a password reset email has been sent.' });

        if (user.googleId && !user.password) {
            return res.status(400).json({ message: 'This account uses Google sign-in. No password reset needed.' });
        }

        const resetToken = user.generateResetToken();
        await user.save();
        await sendPasswordResetEmail(email, resetToken, user.name);

        res.json({ message: 'If an account exists, a password reset email has been sent.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error sending reset email' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        res.json({ message: 'Password reset successfully!' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error resetting password' });
    }
};
