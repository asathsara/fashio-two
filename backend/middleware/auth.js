import pkg from "jsonwebtoken";
const { verify } = pkg;
import User from '../models/user.js';

const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header or cookies
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify token
        const decoded = verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

const verifiedEmail = (req, res, next) => {
    if (req.user && req.user.emailVerified) {
        next();
    } else {
        res.status(403).json({ message: 'Please verify your email first' });
    }
};

const authMiddleware = { protect, admin, verifiedEmail };
export default authMiddleware;