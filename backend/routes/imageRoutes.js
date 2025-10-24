import { Router } from "express";
import multer from "multer";
import Image from "../models/image.js";

const router = Router();

// Use memory storage to store files in RAM before saving to MongoDB
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Fetch all images (metadata only)
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().select("-data"); // exclude image buffer
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Error fetching images" });
  }
});

// Upload an image
router.post("/uploads", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const newImage = new Image({
      filename: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    await newImage.save();
    res.json({
      id: newImage._id,
      filename: newImage.filename,
      contentType: newImage.contentType,
    });
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" });
  }
});

// Serve image by ID
router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    res.set("Content-Type", image.contentType);
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching image" });
  }
});

// Delete an image
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting image" });
  }
});

export default router;
