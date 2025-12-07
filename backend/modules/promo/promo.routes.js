import { Router } from "express";
import { body } from 'express-validator';
import promoController from './promo.controller.js';

import authMiddleware from '../../middleware/auth.js';
const { protect, admin } = authMiddleware;

const router = Router();

// Validation middleware
const promoValidation = [
    body('item').trim().notEmpty().withMessage('Item is required').isMongoId().withMessage('Invalid item ID'),
    body('startDate').trim().notEmpty().withMessage('Start date is required').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Start date must be in YYYY-MM-DD format'),
    body('startTime').trim().notEmpty().withMessage('Start time is required').matches(/^\d{2}:\d{2}$/).withMessage('Start time must be in HH:MM format'),
    body('endDate').trim().notEmpty().withMessage('End date is required').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('End date must be in YYYY-MM-DD format'),
    body('endTime').trim().notEmpty().withMessage('End time is required').matches(/^\d{2}:\d{2}$/).withMessage('End time must be in HH:MM format'),
    body('discount').trim().notEmpty().withMessage('Discount is required').custom((value) => {
        const num = parseFloat(value);
        if (isNaN(num) || num < 1 || num > 100) {
            throw new Error('Discount must be between 1 and 100');
        }
        return true;
    }),
    body().custom((value, { req }) => {
        const start = new Date(`${req.body.startDate}T${req.body.startTime}`);
        const end = new Date(`${req.body.endDate}T${req.body.endTime}`);
        if (end <= start) {
            throw new Error('End date/time must be after start date/time');
        }
        return true;
    })
];

const updatePromoValidation = [
    body('item').optional().trim().isMongoId().withMessage('Invalid item ID'),
    body('startDate').optional().trim().matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Start date must be in YYYY-MM-DD format'),
    body('startTime').optional().trim().matches(/^\d{2}:\d{2}$/).withMessage('Start time must be in HH:MM format'),
    body('endDate').optional().trim().matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('End date must be in YYYY-MM-DD format'),
    body('endTime').optional().trim().matches(/^\d{2}:\d{2}$/).withMessage('End time must be in HH:MM format'),
    body('discount').optional().trim().custom((value) => {
        const num = parseFloat(value);
        if (isNaN(num) || num < 1 || num > 100) {
            throw new Error('Discount must be between 1 and 100');
        }
        return true;
    })
];

const promoStatusValidation = [
    body('isPaused')
        .not()
        .isEmpty()
        .withMessage('isPaused is required')
        .isBoolean()
        .withMessage('isPaused must be a boolean')
];

// Create
router.post("/add", protect, admin, promoValidation, (req, res) => promoController.addPromo(req, res));

// Update
router.put("/:id", protect, admin, updatePromoValidation, (req, res) => promoController.updatePromo(req, res));

// Read
router.get("/", (req, res) => promoController.getAllPromos(req, res));

// Delete
router.delete("/:id", protect, admin, (req, res) => promoController.deletePromo(req, res));

// Pause/Resume
router.patch("/:id/status", protect, admin, promoStatusValidation, (req, res) => promoController.updatePromoStatus(req, res));

export default router;
