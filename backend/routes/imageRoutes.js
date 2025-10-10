import { Router } from "express";
import multer, { diskStorage } from "multer";
import { unlinkSync } from "fs";
import Image, { find, findById, findByIdAndDelete } from "../models/image";

const router = Router();

// Configure Multer
const storage = diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/slider/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Fetch all images
router.get("/", async (req, res) => {
  try {
    const images = await find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Error fetching images" });
  }
});

// Upload an image
router.post("/uploads", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({ url: `/uploads/slider/${req.file.filename}` });
    await newImage.save();
    res.json(newImage);
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" });
  }
});

// Delete an image
router.delete("/:id", async (req, res) => {
  try {
    const image = await findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    unlinkSync(`./uploads/slider/${image.url.split("/").pop()}`);
    await findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting image" });
  }
});

export default router;
