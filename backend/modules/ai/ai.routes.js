import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import aiController from './ai.controller.js';
import { aiLimiter } from '../../middleware/rateLimiter.js';

const router = Router();
import authMiddleware from '../../middleware/auth.js';
const { protect, admin } = authMiddleware;


// Configure Multer for single image upload
const storage = memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, and JPG files are allowed'));
        }
    },
});

// Generate product description
// Accepts optional single image and required body fields
router.post(
    '/generate-description',
    aiLimiter,
    protect,
    admin,
    upload.single('image'),
    (req, res) => aiController.generateDescription(req, res)
);

export default router;
