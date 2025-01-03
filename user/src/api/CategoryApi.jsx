import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./endpoints";

export const fetchCategories = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
};