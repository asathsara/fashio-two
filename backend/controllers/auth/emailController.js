import User from '../../models/user.js';
import mailService from '../../services/emailService.js';

const { sendVerificationEmail, sendWelcomeEmail } = mailService;

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired verification token' });

        user.emailVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.json({ message: 'Email verified successfully!' });
    } catch (error) {
        console.error('Verify email error:', error);
        res.status(500).json({ message: 'Server error during email verification' });
    }
};

export const resendVerification = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.emailVerified) return res.status(400).json({ message: 'Email already verified' });

        const verificationToken = user.generateVerificationToken();
        await user.save();
        await sendVerificationEmail(user.email, verificationToken, user.name);

        res.json({ message: 'Verification email sent!' });
    } catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({ message: 'Server error sending verification email' });
    }
};
