import type { Category, DeleteSubCategoryResponse, SubCategory } from "../types/category";
import axiosInstance from "./api";
import API_ENDPOINTS from "./endpoints";

export const fetchCategories = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
};

export const insertCategory = async (name: string): Promise<Category> => {
  const response = await axiosInstance.post(API_ENDPOINTS.ADD_CATEGORIES, { name });
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axiosInstance.delete(API_ENDPOINTS.DELETE_CATEGORY(id));
};

export const insertSubCategory = async (
  id: string,
  name: string
): Promise<SubCategory> => {
  const response = await axiosInstance.post(API_ENDPOINTS.ADD_SUBCATEGORY(id), {
    name,
  });
  return response.data;
};

export const deleteSubCategory = async (
  categoryId: string,
  subItemName: string): Promise<DeleteSubCategoryResponse> => {
  const response = await axiosInstance.delete(
    API_ENDPOINTS.DELETE_SUBCATEGORY(categoryId, subItemName)
  );
  return response.data;
};
