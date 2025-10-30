import { Router } from "express";
const router = Router();
import {
    addPromo,
    getAllPromos,
    deletePromo
} from "../controllers/promoController.js";

// Add a promo
router.post("/add", addPromo);

// Fetch all promos
router.get("/", getAllPromos);

// delete a promo
router.delete("/:id", deletePromo);

export default router;