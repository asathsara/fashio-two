import { Router } from "express";
import promoController from './promo.controller.js';

import authMiddleware from '../../middleware/auth.js';
const { protect, admin } = authMiddleware;

const router = Router();

// Create
router.post("/add", protect, admin, (req, res) => promoController.addPromo(req, res));

// Update
router.put("/:id", protect, admin, (req, res) => promoController.updatePromo(req, res));

// Read
router.get("/", (req, res) => promoController.getAllPromos(req, res));

// Delete
router.delete("/:id", protect, admin, (req, res) => promoController.deletePromo(req, res));

export default router;
