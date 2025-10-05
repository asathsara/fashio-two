
import axiosInstance from "./AxiosInstance";
import API_ENDPOINTS from "./Endpoints";

export const fetchItems = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ITEMS);
  return response.data;
};

export const insertItem = async (formData: FormData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ADD_ITEMS, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteItem = async (id: string) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_ITEM(id));
  return response.data;
}
