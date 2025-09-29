export interface Item {
  _id: string,  
  urls: string[];
  name: string;
  price: number;
  stock: number;
  category: string;
  subCategory: string;
  sizes: string[];
  description?: string;
}

export interface Category {
  _id:string,
  name: string;
  subItems: { name: string }[];
}

export interface Image {
    url: string
}

