import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./Endpoints";

export const fetchCategories = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
};

export const insertCategory = async (name) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ADD_CATEGORIES, name);
  return response.data;
};

export const deleteCategory = async (id) => {
  const respone = await axiosInstance.delete(API_ENDPOINTS.DELETE_CATEGORY(id));
  return respone.data;
};

export const insertSubCategory = async (id, name) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ADD_SUBCATEGORY(id), {
    name,
  });
  return response.data;
};

export const deleteSubCategory = async (categoryId, subItemName) => {
  const response = await axiosInstance.delete(
    API_ENDPOINTS.DELETE_SUBCATEGORY(categoryId, subItemName)
  );
  return response.data;
};
