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
  items: PromoSelectableItem[];
  loading: boolean;
  onSubmit: (promo: Omit<Promo, "_id">) => Promise<void>;
  onSuccess: () => void;
  onError: (message: string) => void;
}

