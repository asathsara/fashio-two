export interface Category {
  _id: string;
  name: string;
  subCategories?: SubCategory[]; // this is for listing subcategories
  subCategory?: SubCategory; // this is for representing an item with a single subcategory
  hasAssignedItems?: boolean;
}

export interface SubCategory {
  _id: string;
  name: string;
  hasAssignedItems?: boolean;
}

export interface DeleteSubCategoryResponse {
  message: string;
  subCategories: SubCategory[];
}
