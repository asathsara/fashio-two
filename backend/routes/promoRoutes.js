import { Router } from "express";
const router = Router();
import Promo from "../models/promo.js";

// Add a promo
router.post("/add", async (req, res) => {
    const promo = new Promo({
        item: req.body.item,
        startDate: req.body.startDate,
        startTime: req.body.startTime,
        endDate: req.body.endDate,
        endTime: req.body.endTime,
        discount: req.body.discount,
    });
    await promo.save();
    res.status(201).send(promo);
})

// Fetch all promos
router.get("/", async (req, res) => {
    const promos = await Promo.find();
    res.send(promos);
})

// delete a promo
router.delete("/:id", async (req, res) => {
    await Promo.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

export default router;