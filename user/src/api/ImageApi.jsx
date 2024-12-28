import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./endpoints";

export const fetchImages = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.IMAGES);
  return response.data;
};
