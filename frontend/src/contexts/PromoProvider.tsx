import { useItems } from "@/hooks/useItems";
import { usePromos } from "@/hooks/usePromos";
import type { PromoSelectableItem, PromoWithItem } from "@/types/promo";
import type { Item } from "@/types/item";
import type { ReactNode } from "react";
import { PromoContext, type PromoContextValue } from "./PromoContext";
import { useCallback } from "react";

interface PromoProviderProps {
  children: ReactNode;
}

export const PromoProvider = ({ children }: PromoProviderProps) => {
  const { data: itemsData = [], isLoading: itemsLoading } = useItems();
  const { data: promosData = [], isLoading: promosLoading } = usePromos();

  // Map Item[] to PromoSelectableItem[] - only pick the needed fields
  const items: PromoSelectableItem[] = itemsData.map(item => ({
    _id: item._id,
    name: item.name,
    category: item.category,
  }));

  // Check if a promo is currently active
  const isPromoActive = useCallback((promo: PromoWithItem): boolean => {
    const now = new Date();
    const startDateTime = new Date(`${promo.startDate}T${promo.startTime}`);
    const endDateTime = new Date(`${promo.endDate}T${promo.endTime}`);

    return now >= startDateTime && now <= endDateTime;
  }, []);

  // Get active promo for a specific item
  const getActivePromoForItem = useCallback((itemId: string): PromoWithItem | null => {
    const itemPromos = promosData.filter(promo =>
      promo.item._id === itemId && isPromoActive(promo)
    );

    return itemPromos.length > 0 ? itemPromos[0] : null;
  }, [promosData, isPromoActive]);

  // Calculate discounted price
  const calculateDiscountedPrice = useCallback((originalPrice: number, discountPercentage: string): number => {
    const discount = parseFloat(discountPercentage);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      return originalPrice;
    }

    const discountAmount = (originalPrice * discount) / 100;
    return originalPrice - discountAmount;
  }, []);

  // Get complete pricing info for an item
  const getItemPricing = useCallback((item: Item) => {
    const originalPrice = item.price;

    // If item already has promo info from backend, use it
    if (item.hasPromo !== undefined) {
      return {
        originalPrice: item.originalPrice || originalPrice,
        appliedPrice: item.appliedPrice || originalPrice,
        discount: item.discount || 0,
        hasPromo: item.hasPromo,
        discountPercentage: item.discountPercentage
      };
    }

    // Otherwise calculate from context promos
    const activePromo = item._id ? getActivePromoForItem(item._id) : null;

    if (!activePromo) {
      return {
        originalPrice,
        appliedPrice: originalPrice,
        discount: 0,
        hasPromo: false
      };
    }

    const appliedPrice = calculateDiscountedPrice(originalPrice, activePromo.discount);
    const discountAmount = originalPrice - appliedPrice;

    return {
      originalPrice,
      appliedPrice: Math.round(appliedPrice * 100) / 100,
      discount: Math.round(discountAmount * 100) / 100,
      hasPromo: true,
      discountPercentage: activePromo.discount
    };
  }, [getActivePromoForItem, calculateDiscountedPrice]);

  const value: PromoContextValue = {
    items,
    promos: promosData,
    isLoading: itemsLoading || promosLoading,
    getActivePromoForItem,
    calculateDiscountedPrice,
    getItemPricing,
    isPromoActive
  };

  return <PromoContext.Provider value={value}>{children}</PromoContext.Provider>;
};
