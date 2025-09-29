import axiosInstance from "./AxiosInstance";
import API_ENDPOINTS from "./Endpoints";

export const fetchCategories = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
};