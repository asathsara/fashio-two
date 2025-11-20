import type { Image } from "./image";
import type { Category, SubCategory } from "./category";

export interface Item {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  category: Category;
  subCategory: SubCategory;
  sizes: string[];
  images?: Image[];
  description?: string;
}