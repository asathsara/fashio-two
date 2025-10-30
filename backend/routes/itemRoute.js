import { Router } from "express";
const router = Router();
import multer, { memoryStorage } from "multer";
import {
  addItem,
  getAllItems,
  deleteItem,
  getItemImage
} from "../controllers/itemController.js";

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
router.post("/add", upload.array("images", 4), addItem);

// Fetch all items
router.get("/", getAllItems);

// Delete an item
router.delete("/:id", deleteItem);

// Get image by item ID and image index
router.get("/:itemId/image/:index", getItemImage);

export default router;
