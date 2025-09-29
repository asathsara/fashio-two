import axiosInstance from "./AxiosInstance";
import API_ENDPOINTS from "./Endpoints";

export const fetchImages = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.IMAGES);
  return response.data;
};
