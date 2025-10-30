import type { Image } from "./image";
import type { Category } from "./category";

export interface Item {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  category: Category;
  subCategoryId: string;
  subCategoryName: string;
  sizes: string[];
  images?: Image[];
  description?: string;
}