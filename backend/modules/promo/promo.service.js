import Promo from './promo.model.js';

/**
 * Promo Service
 * Contains all business logic for promo operations
 */
class PromoService {
    // ==================== Create ====================
    async createPromo(promoData) {
        const promo = new Promo({
            item: promoData.item,
            startDate: promoData.startDate,
            startTime: promoData.startTime,
            endDate: promoData.endDate,
            endTime: promoData.endTime,
            discount: promoData.discount,
        });
        await promo.save();
        return promo;
    }

    // ==================== Read ====================
    async getAllPromos() {
        const promos = await Promo.find().populate("item");
        return promos;
    }

    async getPromoById(promoId) {
        const promo = await Promo.findById(promoId).populate("item");
        if (!promo) {
            throw new Error('Promo not found');
        }
        return promo;
    }

    // ==================== Delete ====================
    async deletePromo(promoId) {
        const promo = await Promo.findByIdAndDelete(promoId);
        if (!promo) {
            throw new Error('Promo not found');
        }
        return { message: 'Promo deleted successfully' };
    }
}

export default PromoService;
