import PromoService from './promo.service.js';
import { validationResult } from 'express-validator';

const promoService = new PromoService();


class PromoController {
    // Create
    async addPromo(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const promo = await promoService.createPromo(req.body);
            res.status(201).send(promo);
        } catch (error) {
            console.error('Add promo error:', error);
            res.status(500).json({ message: 'Error creating promo', error: error.message });
        }
    }

    async updatePromo(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const promo = await promoService.updatePromo(req.params.id, req.body);
            res.status(200).json(promo);
        } catch (error) {
            console.error('Update promo error:', error);
            if (error.message === 'Promo not found') {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === 'Archived promos cannot be modified') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error updating promo', error: error.message });
        }
    }

    // Read 
    async getAllPromos(req, res) {
        try {
            const promos = await promoService.getAllPromos();
            res.send(promos);
        } catch (error) {
            console.error('Get promos error:', error);
            res.status(500).json({ message: 'Error fetching promos', error: error.message });
        }
    }

    // Delete 
    async deletePromo(req, res) {
        try {
            await promoService.deletePromo(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error('Delete promo error:', error);
            if (error.message === 'Promo not found') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error deleting promo', error: error.message });
        }
    }

    async updatePromoStatus(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const promo = await promoService.setPromoPauseState(req.params.id, req.body.isPaused);
            res.status(200).json(promo);
        } catch (error) {
            console.error('Update promo status error:', error);
            if (error.message === 'Promo not found') {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === 'Archived promos cannot be modified') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error updating promo status', error: error.message });
        }
    }
}

export default new PromoController();
