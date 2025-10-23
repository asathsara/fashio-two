import { useItems } from "@/hooks/useItems";
import { usePromos } from "@/hooks/usePromos";
import type { PromoSelectableItem } from "@/types/promo";
import type { ReactNode } from "react";
import { PromoContext, type PromoContextValue } from "./PromoContext";

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

  const value: PromoContextValue = {
    items,
    promos: promosData,
    isLoading: itemsLoading || promosLoading,
  };

  return <PromoContext.Provider value={value}>{children}</PromoContext.Provider>;
};
