import type { Item } from "./item";

export interface Promo {
  _id?: string,
  item: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  discount: string;
  isArchived?: boolean;
  archivedAt?: string | null;
  archivedReason?: string | null;
}


export type PromoSelectableItem = Pick<Item, "_id" | "name" | "category">;

export interface PromoFormProps {
  editingPromo?: PromoWithItem | null;
  onSubmit: (promo: Omit<Promo, "_id">, promoId?: string) => void | Promise<void>;
  onCancelEdit?: () => void;
  isCreatePending?: boolean;
  isUpdatePending?: boolean;
}

export interface PromoWithItem extends Omit<Promo, 'item'> {
  item: {
    _id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
  } | null;
}

export interface PromoContextValue {
  items: PromoSelectableItem[];
  promos: PromoWithItem[];
  isLoading: boolean;
}

