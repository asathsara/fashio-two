import { Router } from "express";
const router = Router();
import Category from "../models/category.js";

// Add a category
router.post("/add", async (req, res) => {
  const category = new Category({ name: req.body.name, subCategories: [] });
  await category.save();
  res.status(201).send(category);
});

// Fetch all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

// Add a subcategory
router.post("/:id/sub-categories", async (req, res) => {
  const category = await Category.findById(req.params.id);
  const newSubItem = { name: req.body.name };
  category.subCategories.push(newSubItem);
  await category.save();

  // Send back only the new sub-item instead of the entire category
  res.status(201).send(newSubItem);
});


// delete a category
router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Delete a subcategory
router.delete("/:id/sub-categories/:subItemName", async (req, res) => {
  const { id, subItemName } = req.params; // Correct destructuring

  // Find the category
  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).send({ error: "Category not found" });
  }

  // Remove the sub-item
  const initialLength = category.subCategories.length;
  category.subCategories = category.subCategories.filter(
    (subItem) => subItem.name !== subItemName
  );

  // Check if a sub-item was actually deleted
  if (category.subCategories.length === initialLength) {
    return res.status(404).send({ error: "Sub-item not found" });
  }

  // Save the updated category
  await category.save();

  // Send a response 
  res.send({ message: "Sub-item deleted successfully", subCategories: category.subCategories });
});

export default router;
