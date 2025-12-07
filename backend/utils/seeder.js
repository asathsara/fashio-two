import User from '../modules/auth/auth.model.js';
import logger from '../config/logger.js';

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            logger.info('Admin user already exists.');
            return;
        }

        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@fashio.com',
            password: 'adminpassword123',
            role: 'admin',
            emailVerified: true
        });

        await adminUser.save();
        logger.info('Admin user created successfully');
        logger.info('Email: admin@fashio.com');
        logger.info('Password: adminpassword123');

    } catch (error) {
        logger.error({ err: error }, 'Error seeding admin user');
    }
};

export default seedAdmin;
