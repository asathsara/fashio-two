import axiosInstance from "./AxiosInstance";
import API_ENDPOINTS from "./Endpoints";

export const fetchItems = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ITEMS);
  return response.data;
};

