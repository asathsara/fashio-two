const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Image = require("../models/image");

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Fetch all images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Error fetching images" });
  }
});

// Upload an image
router.post("/uploads", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({ url: `/uploads/${req.file.filename}` });
    await newImage.save();
    res.json(newImage);
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" });
  }
});

// Delete an image
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    fs.unlinkSync(`./uploads/${image.url.split("/").pop()}`);
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting image" });
  }
});

module.exports = router;
