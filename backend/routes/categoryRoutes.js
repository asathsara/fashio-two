const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// Add a category
router.post("/categories", async (req, res) => {
  const category = new Category({ name: req.body.name, subItems: [] });
  await category.save();
  res.status(201).send(category);
});

// Fetch all categories
router.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

// Add a subcategory
router.post("/categories/:id/sub-categories", async (req, res) => {
  const category = await Category.findById(req.params.id);
  category.subItems.push({ name: req.body.name });
  await category.save();
  res.status(201).send(category);
});

// delete a category
router.delete("/categories/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// delete a subcategory
router.delete(
  "/categories/:id/sub-categories/:subItemName",
  async (req, res) => {
    const { categoryId, subItemName } = req.params;

    // Find the category and remove the sub-item by name
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    category.subItems = category.subItems.filter(
      (subItem) => subItem.name !== subItemName
    );

    await category.save();
    res.send(category); // Return the updated category
  }
);
