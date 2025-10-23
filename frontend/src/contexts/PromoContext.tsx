import { createContext} from 'react';
import type { PromoSelectableItem, PromoWithItem } from '@/types/promo';

export interface PromoContextValue {
  items: PromoSelectableItem[];
  promos: PromoWithItem[];
  isLoading: boolean;
}

export const PromoContext = createContext<PromoContextValue | undefined>(undefined);

