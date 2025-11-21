export interface Category {
  _id: string;
  name: string;
  subCategories?: SubCategory[]; // this is for listing subcategories
  subCategory?: SubCategory; // this is for representing an item with a single subcategory
}

export interface SubCategory {
  _id: string;
  name: string;
}

export interface DeleteSubCategoryResponse {
  message: string;
  subCategories: SubCategory[];
}
