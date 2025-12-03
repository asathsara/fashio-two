import Promo from './promo.model.js';


class PromoService {
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

    async updatePromo(promoId, promoData) {
        const promo = await Promo.findByIdAndUpdate(
            promoId,
            {
                item: promoData.item,
                startDate: promoData.startDate,
                startTime: promoData.startTime,
                endDate: promoData.endDate,
                endTime: promoData.endTime,
                discount: promoData.discount,
            },
            { new: true }
        );

        if (!promo) {
            throw new Error('Promo not found');
        }

        return promo;
    }

    // Read
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

    // Delete
    async deletePromo(promoId) {
        const promo = await Promo.findByIdAndDelete(promoId);
        if (!promo) {
            throw new Error('Promo not found');
        }
    }

    // Check if a promo is currently active
    // Treats stored dates as UTC to ensure consistent timezone handling
    isPromoActive(promo) {
        const now = new Date();
        const startDateTime = new Date(`${promo.startDate}T${promo.startTime}Z`);
        const endDateTime = new Date(`${promo.endDate}T${promo.endTime}Z`);

        return now >= startDateTime && now <= endDateTime;
    }

    // Get active promo for a specific item
    async getActivePromoForItem(itemId) {
        const promos = await Promo.find({ item: itemId });

        for (const promo of promos) {
            if (this.isPromoActive(promo)) {
                return promo;
            }
        }

        return null;
    }

    // Get all active promos
    async getActivePromos() {
        const allPromos = await Promo.find().populate("item");
        return allPromos.filter(promo => this.isPromoActive(promo));
    }

    // Calculate discounted price
    calculateDiscountedPrice(originalPrice, discountPercentage) {
        const discount = parseFloat(discountPercentage);
        if (isNaN(discount) || discount < 0 || discount > 100) {
            return originalPrice;
        }

        const discountAmount = (originalPrice * discount) / 100;
        return originalPrice - discountAmount;
    }

    // Get pricing info for an item (with promo if available)
    async getItemPricing(itemId, originalPrice) {
        const activePromo = await this.getActivePromoForItem(itemId);

        if (!activePromo) {
            return {
                originalPrice,
                appliedPrice: originalPrice,
                discount: 0,
                promoId: null,
                hasPromo: false
            };
        }

        const appliedPrice = this.calculateDiscountedPrice(originalPrice, activePromo.discount);
        const discountAmount = originalPrice - appliedPrice;

        return {
            originalPrice,
            appliedPrice: Math.round(appliedPrice * 100) / 100,
            discount: Math.round(discountAmount * 100) / 100,
            promoId: activePromo._id,
            hasPromo: true,
            discountPercentage: activePromo.discount
        };
    }

    // Batch fetch promos for multiple items (optimized for N+1 query prevention)
    async getPromosForItems(itemIds) {
        const promos = await Promo.find({ item: { $in: itemIds } });

        // Filter only active promos and map to include itemId for easy lookup
        const activePromos = [];
        for (const promo of promos) {
            if (this.isPromoActive(promo)) {
                activePromos.push({
                    itemId: promo.item,
                    _id: promo._id,
                    discount: promo.discount,
                    startDate: promo.startDate,
                    startTime: promo.startTime,
                    endDate: promo.endDate,
                    endTime: promo.endTime
                });
            }
        }

        return activePromos;
    }

    // Calculate pricing in-memory (no database query)
    calculatePricing(originalPrice, promo = null) {
        if (!promo) {
            return {
                originalPrice,
                appliedPrice: originalPrice,
                discount: 0,
                promoId: null,
                hasPromo: false
            };
        }

        const appliedPrice = this.calculateDiscountedPrice(originalPrice, promo.discount);
        const discountAmount = originalPrice - appliedPrice;

        return {
            originalPrice,
            appliedPrice: Math.round(appliedPrice * 100) / 100,
            discount: Math.round(discountAmount * 100) / 100,
            promoId: promo._id,
            hasPromo: true,
            discountPercentage: promo.discount
        };
    }
}

export default PromoService;
