import { Router } from "express";
import multer, { memoryStorage } from "multer";
import { body } from 'express-validator';
import itemController from './item.controller.js';

const router = Router();

// Configure Multer for image uploads
const storage = memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG, and JPG files are allowed"));
        }
    },
});

// Validation middleware
const itemValidation = [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 200 }).withMessage('Name is too long'),
    body('price').isFloat({ min: 1 }).withMessage('Price must be at least 1'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be 0 or greater'),
    body('category').trim().notEmpty().withMessage('Category is required').isMongoId().withMessage('Invalid category ID'),
    body('subCategory').trim().notEmpty().withMessage('Subcategory is required').isMongoId().withMessage('Invalid subcategory ID'),
    body('sizes').isString().withMessage('Sizes must be provided').custom((value) => {
        try {
            const parsed = JSON.parse(value);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                throw new Error('At least one size is required');
            }
            return true;
        } catch (e) {
            throw new Error('Invalid sizes format');
        }
    }),
    body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description is too long')
];

const updateItemValidation = [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty').isLength({ max: 200 }).withMessage('Name is too long'),
    body('price').optional().isFloat({ min: 1 }).withMessage('Price must be at least 1'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be 0 or greater'),
    body('category').optional().trim().isMongoId().withMessage('Invalid category ID'),
    body('subCategory').optional().trim().isMongoId().withMessage('Invalid subcategory ID'),
    body('sizes').optional().isString().custom((value) => {
        try {
            const parsed = JSON.parse(value);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                throw new Error('At least one size is required');
            }
            return true;
        } catch (e) {
            throw new Error('Invalid sizes format');
        }
    }),
    body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description is too long')
];

// Create
router.post("/add", upload.array("images", 4), itemValidation, (req, res) => itemController.addItem(req, res));

// Read
router.get("/", (req, res) => itemController.getAllItems(req, res));
router.get("/:id", (req, res) => itemController.getItemById(req, res));
router.get("/:itemId/image/:index", (req, res) => itemController.getItemImage(req, res));

// Update
router.put("/:id", upload.array("images", 4), updateItemValidation, (req, res) => itemController.updateItem(req, res));

// Delete
router.delete("/:id", (req, res) => itemController.deleteItem(req, res));

export default router;
