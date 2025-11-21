export interface Category {
  _id: string;
  name: string;
  subCategories?: SubCategory[];
  subCategory?: SubCategory;
}

export interface SubCategory {
  _id: string;
  name: string;
}

export interface DeleteSubCategoryResponse {
  message: string;
  subCategories: SubCategory[];
}
