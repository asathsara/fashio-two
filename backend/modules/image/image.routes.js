import { Router } from "express";
import multer from "multer";
import imageController from './image.controller.js';

const router = Router();

// Use memory storage to store files in RAM before saving to MongoDB
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Validation middleware for file upload
const validateImageUpload = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
    }
    next();
};

// Create
router.post("/uploads", upload.single("image"), validateImageUpload, (req, res) => imageController.uploadImage(req, res));

// Read
router.get("/", (req, res) => imageController.getAllImages(req, res));
router.get("/:id", (req, res) => imageController.getImageById(req, res));

// Delete
router.delete("/:id", (req, res) => imageController.deleteImage(req, res));

export default router;
