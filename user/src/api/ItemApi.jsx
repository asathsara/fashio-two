import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./endpoints";

export const fetchItems = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ITEMS);
  return response.data;
};

