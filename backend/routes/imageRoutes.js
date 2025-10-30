import { Router } from "express";
import multer from "multer";
import {
  getAllImages,
  uploadImage,
  getImageById,
  deleteImage
} from "../controllers/imageController.js";

const router = Router();

// Use memory storage to store files in RAM before saving to MongoDB
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Fetch all images (metadata only)
router.get("/", getAllImages);

// Upload an image
router.post("/uploads", upload.single("image"), uploadImage);

// Serve image by ID
router.get("/:id", getImageById);

// Delete an image
router.delete("/:id", deleteImage);

export default router;
