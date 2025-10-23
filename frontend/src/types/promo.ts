import type { Item } from "./item";

export interface Promo {
  _id?: string,
  item: string;          
  startDate: string;     
  startTime: string;    
  endDate: string;     
  endTime: string;       
  discount: string;      
}


export type PromoSelectableItem = Pick<Item, "_id" | "name" | "category">;

export interface PromoFormProps {
  onSubmit: (promo: Omit<Promo, "_id">) => Promise<void>;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export interface PromoWithItem extends Omit<Promo, 'item'> {
  item: {
    _id: string;
    name: string;
    price: number;
    category: string;
    urls?: string[];
  };
}

export interface PromoContextValue {
  items: PromoSelectableItem[];
  promos: PromoWithItem[];
  isLoading: boolean;
}

