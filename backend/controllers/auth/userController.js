import User from '../../models/user.js';

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
            avatar: user.avatar
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ message: 'Server error fetching user' });
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.json({ message: 'Logged out successfully' });
};
