import { Router } from "express";
const router = Router();
import multer, { memoryStorage } from "multer";
import Item from "../models/item.js";

// Configure Multer for image uploads
const storage = memoryStorage()
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
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    // Map uploaded files into objects for MongoDB
    const imageObjects = req.files.map(file => ({
      filename: file.originalname,
      data: file.buffer,
      contentType: file.mimetype,
    }));

    // Create a new Item instance using req.body and the image URLs
    const item = new Item({
      images: imageObjects,
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
    const items = await Item.find().select("-images.data"); // Exclude image buffer data

    // Respond with the list of items
    res.status(200).json(items);
  } catch (err) {
    // Handle errors and respond appropriately
    res
      .status(500)
      .json({ message: "Failed to fetch items", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {

    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Failed to delete item", error: err.message });
  }
});

// Get image by item ID and image index
router.get("/:itemId/image/:index", async (req, res) => {
  try {
    const { itemId, index } = req.params;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const image = item.images[index];
    if (!image) return res.status(404).json({ message: "Image not found" });

    res.set("Content-Type", image.contentType);
    res.send(image.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching image", error: err.message });
  }
});



export default router;
