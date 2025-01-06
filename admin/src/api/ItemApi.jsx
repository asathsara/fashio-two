import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./Endpoints";

export const fetchItems = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ITEMS);
  return response.data;
};

export const insertItem = async (formData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ADD_ITEMS, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
