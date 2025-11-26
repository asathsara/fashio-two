import { useItems } from "@/hooks/useItems";
import { usePromos } from "@/hooks/usePromos";
import type { PromoSelectableItem } from "@/types/promo";
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
  // Backend already calculates promo pricing, so just use that data
  const getItemPricing = useCallback((item: Item) => {
    const originalPrice = item.price;

    return {
      originalPrice: item.originalPrice || originalPrice,
      appliedPrice: item.appliedPrice || originalPrice,
      discount: item.discount || 0,
      hasPromo: item.hasPromo || false,
      discountPercentage: item.discountPercentage
    };
  }, []);

  const value: PromoContextValue = {
    items,
    promos: promosData,
    isLoading: itemsLoading || promosLoading,
    calculateDiscountedPrice,
    getItemPricing
  };

  return <PromoContext.Provider value={value}>{children}</PromoContext.Provider>;
};
