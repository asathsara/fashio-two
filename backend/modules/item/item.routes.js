import { Router } from "express";
import multer, { memoryStorage } from "multer";
import itemController from './item.controller.js';

const router = Router();

// Configure Multer for image uploads
const storage = memoryStorage();
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

// Create
router.post("/add", upload.array("images", 4), (req, res) => itemController.addItem(req, res));

// Read
router.get("/", (req, res) => itemController.getAllItems(req, res));
router.get("/:id", (req, res) => itemController.getItemById(req, res));
router.get("/:itemId/image/:index", (req, res) => itemController.getItemImage(req, res));

// Delete
router.delete("/:id", (req, res) => itemController.deleteItem(req, res));

export default router;
