import Promo from "../models/promo.js";

// Add a promo
export const addPromo = async (req, res) => {
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
};

// Fetch all promos
export const getAllPromos = async (req, res) => {
    const promos = await Promo.find().populate("item");
    res.send(promos);
};

// Delete a promo
export const deletePromo = async (req, res) => {
    await Promo.findByIdAndDelete(req.params.id);
    res.status(204).send();
};
