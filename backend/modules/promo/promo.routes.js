import { Router } from "express";
import promoController from './promo.controller.js';

const router = Router();

// Create
router.post("/add", (req, res) => promoController.addPromo(req, res));

// Update
router.put("/:id", (req, res) => promoController.updatePromo(req, res));

// Read
router.get("/", (req, res) => promoController.getAllPromos(req, res));

// Delete
router.delete("/:id", (req, res) => promoController.deletePromo(req, res));

export default router;
