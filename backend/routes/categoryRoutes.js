import { Router } from "express";
const router = Router();
import {
  addCategory,
  getAllCategories,
  addSubCategory,
  deleteCategory,
  deleteSubCategory
} from "../controllers/categoryController.js";

// Add a category
router.post("/add", addCategory);

// Fetch all categories
router.get("/", getAllCategories);

// Add a subcategory
router.post("/:id/sub-categories", addSubCategory);

// delete a category
router.delete("/:id", deleteCategory);

// Delete a subcategory
router.delete("/:id/sub-categories/:subItemName", deleteSubCategory);

export default router;
