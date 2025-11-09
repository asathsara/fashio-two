import type { Image } from "../types/image";
import axiosInstance from "./api";
import API_ENDPOINTS from "./endpoints";

export const fetchImages = async (): Promise<Image[]> => {
  const response = await axiosInstance.get(API_ENDPOINTS.IMAGES);
  return response.data;
};

export const uploadImage = async (formData: FormData): Promise<Image> => {
  const response = await axiosInstance.post(API_ENDPOINTS.UPLOAD_IMAGE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteImage = async (id: string): Promise<void> => {

  await axiosInstance.delete(API_ENDPOINTS.DELETE_IMAGE(id));
};
