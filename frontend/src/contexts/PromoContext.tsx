import { createContext } from 'react';
import type { PromoSelectableItem, PromoWithItem } from '@/types/promo';
import type { Item } from '@/types/item';

export interface PromoContextValue {
  items: PromoSelectableItem[];
  promos: PromoWithItem[];
  isLoading: boolean;
  getActivePromoForItem: (itemId: string) => PromoWithItem | null;
  calculateDiscountedPrice: (originalPrice: number, discountPercentage: string) => number;
  getItemPricing: (item: Item) => {
    originalPrice: number;
    appliedPrice: number;
    discount: number;
    hasPromo: boolean;
    discountPercentage?: string;
  };
  isPromoActive: (promo: PromoWithItem) => boolean;
}

export const PromoContext = createContext<PromoContextValue | undefined>(undefined);

