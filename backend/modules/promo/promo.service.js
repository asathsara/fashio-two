import Promo from './promo.model.js';
import Item from '../item/item.model.js';


class PromoService {
    async ensureItemIsActive(itemId) {
        const itemExists = await Item.exists({ _id: itemId, isDeleted: { $ne: true } });
        if (!itemExists) {
            throw new Error('Item not found or unavailable for promotions');
        }
    }

    async createPromo(promoData) {
        await this.ensureItemIsActive(promoData.item);
        const promo = new Promo({
            item: promoData.item,
            startDate: promoData.startDate,
            startTime: promoData.startTime,
            endDate: promoData.endDate,
            endTime: promoData.endTime,
            discount: promoData.discount,
            isArchived: false,
            isPaused: false
        });
        await promo.save();
        return promo;
    }

    async updatePromo(promoId, promoData) {
        const promo = await Promo.findById(promoId);
        if (!promo) {
            throw new Error('Promo not found');
        }

        if (promo.isArchived) {
            throw new Error('Archived promos cannot be modified');
        }

        if (promoData.item) {
            await this.ensureItemIsActive(promoData.item);
            promo.item = promoData.item;
        }

        const updatableFields = ['startDate', 'startTime', 'endDate', 'endTime', 'discount'];
        updatableFields.forEach((field) => {
            if (promoData[field] !== undefined) {
                promo[field] = promoData[field];
            }
        });

        await promo.save();
        return promo;
    }

    // Read
    async getAllPromos() {
        return Promo.find().populate('item');
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
        if (promo.isArchived || promo.isPaused) {
            return false;
        }
        const now = new Date();
        const startDateTime = new Date(`${promo.startDate}T${promo.startTime}Z`);
        const endDateTime = new Date(`${promo.endDate}T${promo.endTime}Z`);

        return now >= startDateTime && now <= endDateTime;
    }

    // Get active promo for a specific item
    async getActivePromoForItem(itemId) {
        const itemActive = await Item.exists({ _id: itemId, isDeleted: { $ne: true } });
        if (!itemActive) {
            return null;
        }

        const promos = await Promo.find({
            item: itemId,
            isArchived: { $ne: true },
            isPaused: { $ne: true }
        });

        for (const promo of promos) {
            if (this.isPromoActive(promo)) {
                return promo;
            }
        }

        return null;
    }

    // Get all active promos
    async getActivePromos() {
        const allPromos = await Promo.find({
            isArchived: { $ne: true },
            isPaused: { $ne: true }
        }).populate({
            path: "item",
            match: { isDeleted: { $ne: true } }
        });
        return allPromos.filter(promo => promo.item && this.isPromoActive(promo));
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
        const promos = await Promo.find({
            item: { $in: itemIds },
            isArchived: { $ne: true },
            isPaused: { $ne: true }
        });

        const activeItems = await Item.find({
            _id: { $in: itemIds },
            isDeleted: { $ne: true }
        })
            .select('_id')
            .lean();

        const activeItemSet = new Set(activeItems.map(item => item._id.toString()));

        const activePromos = [];

        for (const promo of promos) {
            const isActiveItem = activeItemSet.has(promo.item.toString());
            const isActivePromo = this.isPromoActive(promo);

            if (isActiveItem && isActivePromo) {
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


    async archivePromosForItem(itemId) {
        const now = new Date();

        await Promo.updateMany(
            { item: itemId, isArchived: { $ne: true } },
            {
                isArchived: true,
                archivedAt: now,
                archivedReason: 'Item deleted',
                isPaused: true,
                pausedAt: now,
                // endDate and endTime are intentionally not modified
            }
        );
    }

    async setPromoPauseState(promoId, shouldPause) {
        const promo = await Promo.findById(promoId);
        if (!promo) {
            throw new Error('Promo not found');
        }
        if (promo.isArchived) {
            throw new Error('Archived promos cannot be modified');
        }

        promo.isPaused = shouldPause;
        promo.pausedAt = shouldPause ? new Date() : null;
        promo.pausedReason = shouldPause ? 'Manually paused' : null;
        await promo.save();
        return promo;
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
