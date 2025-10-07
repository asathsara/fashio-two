export interface Item {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  subCategory: string;
  sizes: string[];
  urls?: string[];
}