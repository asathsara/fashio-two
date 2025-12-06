
import type { Item } from "@/types/item";
import axiosInstance from "./api";
import API_ENDPOINTS from "./endpoints";

export const fetchItems = async (): Promise<Item[]> => {
  const response = await axiosInstance.get(API_ENDPOINTS.ITEMS);
  return response.data;
};

export const fetchItemById = async (id: string): Promise<Item> => {
  const response = await axiosInstance.get(API_ENDPOINTS.GET_ITEM(id));
  return response.data;
};

export const fetchItemBySlug = async (slug: string): Promise<Item> => {
  const response = await axiosInstance.get(API_ENDPOINTS.GET_ITEM_BY_SLUG(slug));
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

export const updateItem = async (id: string, formData: FormData) => {
  const response = await axiosInstance.put(API_ENDPOINTS.UPDATE_ITEM(id), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteItem = async (id: string) => {

  await axiosInstance.delete(API_ENDPOINTS.DELETE_ITEM(id));
}
