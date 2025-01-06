const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const Item = require("../models/item");
const path = require("path");

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/items/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
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

// Add an item
router.post("/add", upload.array("images", 4), async (req, res) => {
  try {
    // Check if any files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Map uploaded file paths to `urls` field
    const imageUrls = req.files.map((file) => `/uploads/items/${file.filename}`);

    // Create a new Item instance using req.body and the image URLs
    const item = new Item({
      urls: imageUrls,
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      subCategory: req.body.subCategory,
      sizes: req.body.sizes,
      description: req.body.description,
    });

    // Save the Item to the database
    await item.save();

    // Respond with the created item
    res.status(201).json(item);
  } catch (err) {
    // Handle errors and respond appropriately
    res.status(500).json({ message: "Failed to add item", error: err.message });
  }
});

// Fetch all items
router.get("/", async (req, res) => {
  try {
    // Retrieve all items from the database
    const items = await Item.find();

    // Respond with the list of items
    res.status(200).json(items);
  } catch (err) {
    // Handle errors and respond appropriately
    res.status(500).json({ message: "Failed to fetch items", error: err.message });
  }
});




router.delete("/:id", async (req, res) => {
  try {
    // Find the item by ID
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Delete the images from the filesystem
    item.urls.forEach((fileUrl) => {
      const filePath = `./uploads/items/${fileUrl}`; // The file path
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}:`, err);
        }
      });
    });

    // Find the item by ID and delete it from the database
     await Item.findByIdAndDelete(req.params.id);

    // Respond with success message
    res.status(200).json({ message: "Item and its images deleted successfully" });
  } catch (err) {
    // Handle errors and respond appropriately
    res.status(500).json({ message: "Failed to delete item", error: err.message });
  }
});


module.exports = router;
