import User from '../../models/user.js';
import { validationResult } from 'express-validator';
import mailService from '../../services/emailService.js';

const { sendVerificationEmail } = mailService;

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });

        const verificationToken = user.generateVerificationToken();
        await user.save();
        await sendVerificationEmail(email, verificationToken, name);

        res.status(201).json({
            message: 'Registration successful! Please check your email.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                emailVerified: user.emailVerified
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};
