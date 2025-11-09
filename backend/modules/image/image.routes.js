import { Router } from "express";
import multer from "multer";
import imageController from './image.controller.js';

const router = Router();

// Use memory storage to store files in RAM before saving to MongoDB
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create
router.post("/uploads", upload.single("image"), (req, res) => imageController.uploadImage(req, res));

// Read
router.get("/", (req, res) => imageController.getAllImages(req, res));
router.get("/:id", (req, res) => imageController.getImageById(req, res));

// Delete
router.delete("/:id", (req, res) => imageController.deleteImage(req, res));

export default router;
