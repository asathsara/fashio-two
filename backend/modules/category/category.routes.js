import { Router } from "express";
import categoryController from './category.controller.js';

const router = Router();

// Create
router.post("/add", (req, res) => categoryController.addCategory(req, res));
router.post("/:id/sub-categories", (req, res) => categoryController.addSubCategory(req, res));

// Read
router.get("/", (req, res) => categoryController.getAllCategories(req, res));

// Delete
router.delete("/:id", (req, res) => categoryController.deleteCategory(req, res));
router.delete("/:id/sub-categories/:subItemName", (req, res) => categoryController.deleteSubCategory(req, res));

export default router;
