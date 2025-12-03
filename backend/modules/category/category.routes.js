import { Router } from "express";
import { body } from 'express-validator';
import categoryController from './category.controller.js';

const router = Router();

// Validation middleware
const categoryValidation = [
    body('name').trim().notEmpty().withMessage('Category name is required').isLength({ max: 100 }).withMessage('Category name is too long')
];

const subCategoryValidation = [
    body('name').trim().notEmpty().withMessage('Subcategory name is required').isLength({ max: 100 }).withMessage('Subcategory name is too long')
];

// Create
router.post("/add", categoryValidation, (req, res) => categoryController.addCategory(req, res));
router.post("/:id/sub-categories", subCategoryValidation, (req, res) => categoryController.addSubCategory(req, res));

// Read
router.get("/", (req, res) => categoryController.getAllCategories(req, res));

// Delete
router.delete("/:id", (req, res) => categoryController.deleteCategory(req, res));
router.delete("/:id/sub-categories/:subItemName", (req, res) => categoryController.deleteSubCategory(req, res));

export default router;
