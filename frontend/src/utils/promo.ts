import type { PromoWithItem } from "@/types/promo";

export const formatDate = (date: string): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export const calculateDiscountedPrice = (price: number, discount: string): string => {
    const discountPercent = parseFloat(discount);
    return (price * (1 - discountPercent / 100)).toFixed(2);
};

export const getPromoImageUrl = (promo: PromoWithItem): string | null => {
    if (promo.item?.images && promo.item.images.length > 0) {
        return `${import.meta.env.VITE_API_ITEM_IMAGES_URL}${promo.item._id}/image/0`;
    }
    return null;
};

export type ClientPromoStatus = "active" | "upcoming" | "expired" | "paused";

export const getPromoStatus = (promo: PromoWithItem): ClientPromoStatus => {
    if (promo.isPaused) {
        return "paused";
    }

    const now = new Date();
    const start = new Date(`${promo.startDate}T${promo.startTime}`);
    const end = new Date(`${promo.endDate}T${promo.endTime}`);

    if (now < start) return "upcoming";
    if (now > end) return "expired";
    return "active";
};
