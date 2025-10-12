import User from '../../models/user.js';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const generateToken = (id) => {
    return sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const googleLogin = async (req, res) => {
    try {
        const { credential, name, email, googleId, avatar } = req.body;
        if (!email || !googleId) return res.status(400).json({ message: 'Invalid Google credentials' });

        let user = await User.findOne({ $or: [{ email }, { googleId }] });

        if (user) {
            if (!user.googleId) {
                user.googleId = googleId;
                user.emailVerified = true;
            }
            if (avatar && !user.avatar) user.avatar = avatar;
            user.lastLogin = Date.now();
            await user.save();
        } else {
            user = await User.create({
                name,
                email,
                googleId,
                avatar,
                emailVerified: true,
                role: 'user'
            });
        }

        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                emailVerified: user.emailVerified,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ message: 'Server error during Google login' });
    }
};
