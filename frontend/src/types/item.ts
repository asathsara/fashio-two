import type { Image } from "./image";
import type { Category } from "./category";

export interface Item {
  _id?: string;
  slug?: string;
  name: string;
  price: number;
  stock: number;
  category: Category;
  sizes: string[];
  images?: Image[];
  description?: string;
  // Promo fields
  originalPrice?: number;
  appliedPrice?: number;
  discount?: number;
  promoId?: string | null;
  hasPromo?: boolean;
  discountPercentage?: string;
}